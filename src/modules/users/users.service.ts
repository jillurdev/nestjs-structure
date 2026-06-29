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

@Injectable()
export class UsersService {
	constructor(private readonly prisma: PrismaService) {}

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

		const passwordHash = await bcrypt.hash(dto.password, 10);

		const user = await this.prisma.user.create({
			data: {
				name: dto.name,
				phone: dto.phone,
				passwordHash,
				email,
			},
			select: {
				id: true,
				name: true,
				email: true,
				phone: true,
				role: true,
				balance: true,
				createdAt: true,
			},
		});

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

 
	async deleteUser(id: string) {
		await this.prisma.findUserByIdOrThrow(id);
		await this.prisma.user.delete({ where: { id } });
		return { message: AppMessages.user.deleted };
	}
}
