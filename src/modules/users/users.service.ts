import {
	BadRequestException,
	ConflictException,
	Injectable,
} from "@nestjs/common";
import { PrismaService } from "@/database/prisma/prisma.service";
import { UpdateUserDto } from "./dto/update-user.dto";
import * as bcrypt from "bcrypt";
import { AppMessages } from "@/common/AppMessages/app.messages";
import { CreateUserDto } from "./dto/create-user.dto";
import { Role } from "@/common/decorators/roles.decorator";
import { ReferralService } from "../referral/referral.service";

@Injectable()
export class UsersService {
	constructor(
		private readonly prisma: PrismaService,
		private readonly  referralService: ReferralService,
	) {}

	private async generateReferralCode(): Promise<string> {
		const random = Math.floor(100000 + Math.random() * 900000).toString();
		const code = `TN-${random}`;
		const existing = await this.prisma.user.findFirst({
			where: { referralCode: code },
		});
		if (existing) return this.generateReferralCode();
		return code;
	}

	// admin/ owner
	async findAllUsers() {
		return this.prisma.user.findMany({
			where: { role: Role.USER },
			select: {
				id: true,
				name: true,
				email: true,
				phone: true,
				role: true,
				isActive: true,
				isBanned: true,
				subscriptionType: true,
				balance: true,
				totalEarned: true,
				totalWithdrawn: true,
				createdAt: true,
			},
			orderBy: { createdAt: "desc" },
		});
	}

	async findUserById(id: string) {
		return this.prisma.findUserByIdOrThrow(id);
	}

	async findUserByPhone(phone: string) {
		return this.prisma.findUserByPhone(phone);
	}

	async createUser(dto: CreateUserDto) {
		if (await this.prisma.userExistsByPhone(dto.phone))
			throw new ConflictException(AppMessages.user.phoneExists);

		if (dto.email && (await this.prisma.userExistsByEmail(dto.email)))
			throw new ConflictException(AppMessages.user.emailExists);

		if (dto.deviceId) {
			const count = await this.prisma.userCountByDeviceId(dto.deviceId);
			if (count >= 2)
				throw new BadRequestException(AppMessages.user.deviceLimit);
		}

		const passwordHash = await bcrypt.hash(dto.password, 10);
		const referralCode = await this.generateReferralCode();

		const user = await this.prisma.user.create({
			data: {
				name: dto.name,
				phone: dto.phone,
				passwordHash,
				referralCode,
				...(dto.email && { email: dto.email }),
				...(dto.deviceId && { deviceId: dto.deviceId }),
			},
			select: {
				id: true,
				name: true,
				email: true,
				referralCode: true,
				phone: true,
				role: true,
				subscriptionType: true,
				balance: true,
				createdAt: true,
			},
		});

		if (dto.referralCode) {
			try {
				await this.referralService.applyReferral(user.id, dto.referralCode);
			} catch (e) {
				// referral fail হলেও registration সফল হবে
			}
		}

		return user;
	}

	async saveFcmToken(userId: string, fcmToken: string) {
		return this.prisma.user.update({
			where: { id: userId },
			data: { fcmToken },
			select: { id: true },
		});
	}

	async updateUser(id: string, dto: UpdateUserDto) {
		await this.prisma.findUserByIdOrThrow(id);

		const data: any = {};
		if (dto.name) data.name = dto.name;
		if (dto.email) data.email = dto.email;
		if (dto.phone) data.phone = dto.phone;
		if (dto.password) data.passwordHash = await bcrypt.hash(dto.password, 10);
		if (dto.avatarUrl) data.avatarUrl = dto.avatarUrl;

		return this.prisma.user.update({
			where: { id },
			data,
			select: {
				id: true,
				name: true,
				email: true,
				phone: true,
				role: true,
				subscriptionType: true,
				avatarUrl: true,
				updatedAt: true,
			},
		});
	}

	async changePassword(
		id: string,
		currentPassword: string,
		newPassword: string,
	) {
		if (currentPassword === newPassword) {
			throw new BadRequestException(AppMessages.user.passwordSameAsOld);
		}

		const user = await this.prisma.findUserByIdOrThrow(id);

		const isMatch = await bcrypt.compare(currentPassword, user.passwordHash);
		if (!isMatch)
			throw new BadRequestException(AppMessages.user.incorrectPassword);

		await this.prisma.user.update({
			where: { id },
			data: { passwordHash: await bcrypt.hash(newPassword, 10) },
		});
	}

	async banUser(id: string, reason: string, adminId: string) {
		await this.prisma.findUserByIdOrThrow(id);

		return this.prisma.user.update({
			where: { id },
			data: {
				isBanned: true,
				banReason: reason,
				bannedAt: new Date(),
				bannedBy: adminId,
			},
			select: { id: true, isBanned: true, banReason: true },
		});
	}

	async unbanUser(id: string) {
		await this.prisma.findUserByIdOrThrow(id);

		return this.prisma.user.update({
			where: { id },
			data: {
				isBanned: false,
				banReason: null,
				bannedAt: null,
				bannedBy: null,
			},
			select: { id: true, isBanned: true },
		});
	}

	async getUserStats(id: string) {
		const user = await this.prisma.findUserByIdOrThrow(id);

		const today = new Date();
		today.setHours(0, 0, 0, 0);

		const todayRecord = await this.prisma.dailyAdLimit.findUnique({
			where: { userId_date: { userId: id, date: today } },
		});

		return {
			balance: user.balance,
			totalEarned: user.totalEarned,
			totalWithdrawn: user.totalWithdrawn,
			subscriptionType: user.subscriptionType,
			todayWatchCount: todayRecord?.watchCount ?? 0,
			todayEarned: todayRecord?.earned ?? 0,
		};
	}

	async deleteUser(id: string) {
		await this.prisma.findUserByIdOrThrow(id);
		await this.prisma.user.delete({ where: { id } });
		return { message: AppMessages.user.deleted };
	}
}
