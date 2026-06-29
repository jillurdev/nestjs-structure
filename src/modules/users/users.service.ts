import {
	BadRequestException,
	ConflictException,
	Injectable,
} from "@nestjs/common";
import { Request, Response } from "express";
import { PrismaService } from "@/database/prisma/prisma.service";
import * as bcrypt from "bcrypt";
import { AppMessages } from "@/common/AppMessages/app.messages";
import { ChangePasswordDto } from "./dto/change-password.dto";
import { AccountType } from "@prisma/client";
import { configs } from "@/config";

@Injectable()
export class UsersService {
	constructor(private readonly prisma: PrismaService) {}

	// admin/ owner
	async findAllUsers() {}

	async findUserById(id: string) {
		return this.prisma.findUserByIdOrThrow(id);
	}

	async findUserByPhone(phone: string) {
		return this.prisma.findUserByPhone(phone);
	}

	async me(userId: string) {
		const user = await this.prisma.findUserByIdOrThrow(userId);

		const account = await this.prisma.account.findFirst({
			where: {
				userId,
				accountType: AccountType.MAIN,
			},
		});

		return {
			id: user.id,
			handle: user.handle,
			fullName: user.fullName,
			email: user.email,
			phone: user.phone,
			avatarUrl: user.avatarUrl,
			bio: user.bio,
			status: user.status,
			isVerified: user.isVerified,
			kycTier: user.kyc_tier,
			vybeScore: user.vybeScore,
			createdAt: user.createdAt,

			account: account
				? {
						id: account.id,
						virtualAccountNumber: account.virtualAccountNumber,
						balance: account.balance,
						currency: account.currency,
						accountType: account.accountType,
					}
				: null,
		};
	}

	async changePassword(userId: string, dto: ChangePasswordDto, res: Response) {
		const user = await this.prisma.findUserByIdOrThrow(userId);

		const passwordMatched = await bcrypt.compare(
			dto.currentPassword,
			user.passwordHash,
		);

		if (!passwordMatched) {
			throw new BadRequestException(AppMessages.user.incorrectPassword);
		}

		if (dto.currentPassword === dto.newPassword) {
			throw new BadRequestException(AppMessages.user.passwordSameAsOld);
		}

		const passwordHash = await bcrypt.hash(dto.newPassword, 12);

		await this.prisma.$transaction([
			this.prisma.user.update({
				where: {
					id: userId,
				},
				data: {
					passwordHash,
				},
			}),

			this.prisma.session.updateMany({
				where: {
					userId,
					revokedAt: null,
				},
				data: {
					revokedAt: new Date(),
					revokedReason: "PASSWORD_CHANGED",
				},
			}),
		]);

		res.clearCookie("accessToken", {
			httpOnly: true,
			secure: configs.app.isProduction,
			sameSite: "lax",
		});

		res.clearCookie("refreshToken", {
			httpOnly: true,
			secure: configs.app.isProduction,
			sameSite: "lax",
		});

		return {
			message: AppMessages.user.passwordChanged,
		};
	}
}
