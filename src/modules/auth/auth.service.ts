import {
	Injectable,
	UnauthorizedException,
	ForbiddenException,
	ConflictException,
	BadRequestException,
} from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { LoginDto } from "./dto/login.dto";
import * as bcrypt from "bcrypt";
import { PrismaService } from "@/database/prisma/prisma.service";
import { Response } from "express";
import { configs } from "@/config";
import { AppMessages } from "@/common/AppMessages/app.messages";

@Injectable()
export class AuthService {
	constructor(
		private readonly prisma: PrismaService,
		private readonly jwt: JwtService,
	) {}

	async login(dto: LoginDto, res: Response) {
		const user = await this.prisma.findUserByPhone(dto.phone);

		if (!user)
			throw new UnauthorizedException(AppMessages.auth.invalidCredentials);

		const passwordMatch = await bcrypt.compare(dto.password, user.passwordHash);
		if (!passwordMatch)
			throw new UnauthorizedException(AppMessages.auth.invalidCredentials);

		if (!user.isActive)
			throw new ForbiddenException(AppMessages.auth.accountDeactivated);

		if (user.isBanned)
			throw new ForbiddenException(
				AppMessages.auth.accountBanned(user.banReason ?? ""),
			);

		const payload = { sub: user.id, phone: user.phone, role: user.role };

		const accessToken = this.jwt.sign(payload, {
			secret: configs.jwt.secret,
			expiresIn: configs.jwt.expiresIn as any,
		});

		const refreshToken = this.jwt.sign(payload, {
			secret: configs.jwt.refreshSecret,
			expiresIn: configs.jwt.refreshExpiresIn as any,
		});

		await this.prisma.user.update({
			where: { id: user.id },
			data: {
				refreshToken,
				lastLoginAt: new Date(),
				...(dto.deviceId && { deviceId: dto.deviceId }),
			},
		});

		res.cookie("accessToken", accessToken, {
			httpOnly: true,
			secure: configs.app.isProduction,
			sameSite: "lax",
			maxAge: 7 * 24 * 60 * 60 * 1000,
		});

		res.cookie("refreshToken", refreshToken, {
			httpOnly: true,
			secure: configs.app.isProduction,
			sameSite: "lax",
			maxAge: 30 * 24 * 60 * 60 * 1000,
		});

		return {
			accessToken,
			user: {
				id: user.id,
				name: user.name,
				email: user.email,
				phone: user.phone,
				role: user.role,
				referralCode: user.referralCode,
				subscriptionType: user.subscriptionType,
				balance: user.balance,
				totalEarned: user.totalEarned,
				avatarUrl: user.avatarUrl,
			},
		};
	}

	async logout(userId: string, res: Response) {
		await this.prisma.user.update({
			where: { id: userId },
			data: { refreshToken: null },
		});

		res.clearCookie("accessToken");
		res.clearCookie("refreshToken");

		return { message: AppMessages.auth.logoutSuccess };
	}

	async refreshToken(token: string, res: Response) {
		const user = await this.prisma.user.findFirst({
			where: { refreshToken: token },
		});

		if (!user || !user.refreshToken)
			throw new UnauthorizedException(AppMessages.auth.tokenInvalid);

		if (!user.isActive || user.isBanned)
			throw new ForbiddenException(AppMessages.auth.accountDeactivated);

		const payload = { sub: user.id, role: user.role };

		const newAccessToken = this.jwt.sign(payload, {
			secret: configs.jwt.secret,
			expiresIn: configs.jwt.expiresIn as any,
		});

		res.cookie("accessToken", newAccessToken, {
			httpOnly: true,
			secure: configs.app.isProduction,
			sameSite: "lax",
			maxAge: 7 * 24 * 60 * 60 * 1000,
		});

		return { accessToken: newAccessToken };
	}
}
