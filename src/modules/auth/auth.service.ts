import * as bcrypt from "bcrypt";
import * as crypto from "crypto";
import { Request, Response } from "express";
import {
	ConflictException,
	ForbiddenException,
	Injectable,
	UnauthorizedException,
} from "@nestjs/common";
import { PrismaService } from "@/database/prisma/prisma.service";
import { JwtService } from "@nestjs/jwt";
import { JwtPayload } from "@/common/interfaces/jwt-payload.interface";
import { configs } from "@/config";
import { AccountType, LoginMethod, UserStatus } from "@prisma/client";
import { RegisterDto } from "./dto/register.dto";
import { AppMessages } from "@/common/AppMessages/app.messages";
import { LoginDto } from "./dto/login.dto";
import { StringValue } from "ms";
import { getDeviceName, getPlatform } from "@/common/utils/device.util";

@Injectable()
export class AuthService {
	constructor(
		private readonly prisma: PrismaService,
		private readonly jwt: JwtService,
	) {}
	private async generateTokens(payload: JwtPayload) {
		const accessToken = await this.jwt.signAsync(payload, {
			secret: configs.jwt.secret,
			expiresIn: configs.jwt.expiresIn as number | StringValue,
		});

		const refreshToken = await this.jwt.signAsync(payload, {
			secret: configs.jwt.refreshSecret,
			expiresIn: configs.jwt.refreshExpiresIn as number | StringValue,
		});

		return {
			accessToken,
			refreshToken,
		};
	}

	private setAuthCookies(
		res: Response,
		accessToken: string,
		refreshToken: string,
	) {
		res.cookie("accessToken", accessToken, {
			httpOnly: true,
			secure: configs.app.isProduction,
			sameSite: "lax",
			maxAge: 1000 * 60 * 15,
		});

		res.cookie("refreshToken", refreshToken, {
			httpOnly: true,
			secure: configs.app.isProduction,
			sameSite: "lax",
			maxAge: 1000 * 60 * 60 * 24 * 30,
		});
	}

	private async generateUniqueHandle(fullName: string): Promise<string> {
		const base = fullName
			.toLowerCase()
			.replace(/[^a-z0-9]/g, "")
			.substring(0, 20);

		let handle = base || "user";

		while (await this.prisma.userExistsByHandle(handle)) {
			handle = `${base}${crypto.randomInt(1000, 9999)}`;
		}

		return handle;
	}
	private async generateVirtualAccountNumber() {
		let accountNumber: string;

		do {
			accountNumber = `VB${crypto.randomInt(1000000000, 9999999999)}`;
		} while (
			await this.prisma.account.findUnique({
				where: {
					virtualAccountNumber: accountNumber,
				},
			})
		);

		return accountNumber;
	}

	private validateUserStatus(user: {
		status: UserStatus;
		statusReason: string | null;
	}) {
		switch (user.status) {
			case UserStatus.ACTIVE:
			case UserStatus.PENDING_VERIFICATION:
				return;

			case UserStatus.SUSPENDED:
				throw new ForbiddenException(
					user.statusReason ?? "Your account has been suspended.",
				);

			case UserStatus.BANNED:
				throw new ForbiddenException(
					user.statusReason ?? "Your account has been banned.",
				);

			case UserStatus.CLOSED:
				throw new ForbiddenException("Your account has been closed.");
		}
	}
	private getClientIp(req: Request): string {
		return (
			(req.headers["x-forwarded-for"] as string)?.split(",")[0]?.trim() ??
			req.socket.remoteAddress ??
			""
		);
	}

	private getUserAgent(req: Request): string {
		return req.headers["user-agent"] ?? "";
	}

	async register(dto: RegisterDto, req: Request, res: Response) {
		// Check duplicate email
		if (await this.prisma.userExistsByEmail(dto.email)) {
			throw new ConflictException(AppMessages.user.emailExists);
		}

		// Check duplicate phone
		if (await this.prisma.userExistsByPhone(dto.phone)) {
			throw new ConflictException(AppMessages.user.phoneExists);
		}

		// Generate unique handle
		const handle = await this.generateUniqueHandle(dto.fullName);

		// Hash password
		const passwordHash = await bcrypt.hash(dto.password, 12);

		// Generate account number
		const virtualAccountNumber = await this.generateVirtualAccountNumber();

		// Create user & related data
		const result = await this.prisma.$transaction(async tx => {
			const user = await tx.user.create({
				data: {
					handle,
					fullName: dto.fullName.trim(),
					email: dto.email.trim().toLowerCase(),
					phone: dto.phone,
					passwordHash,
					dateOfBirth: new Date(dto.dateOfBirth),
				},
			});

			const account = await tx.account.create({
				data: {
					userId: user.id,
					virtualAccountNumber,
					accountType: AccountType.MAIN,
					currency: "USD",
				},
			});

			await tx.privacySettings.create({
				data: {
					userId: user.id,
				},
			});

			await tx.vybeWishSettings.create({
				data: {
					userId: user.id,
				},
			});

			return {
				user,
				account,
			};
		}); // Generate JWT payload

		// Return authenticated user
		return {
			message: AppMessages.auth.accountPendingVerification,
		};
	}

	async login(dto: LoginDto, req: Request, res: Response) {
		const user = await this.prisma.findUserByEmailOrPhone(dto.identifier);

		if (!user) {
			throw new UnauthorizedException(AppMessages.auth.invalidCredentials);
		}

		const passwordMatched = await bcrypt.compare(
			dto.password,
			user.passwordHash,
		);

		if (!passwordMatched) {
			throw new UnauthorizedException(AppMessages.auth.invalidCredentials);
		}

		this.validateUserStatus({
			status: user.status,
			statusReason: user.statusReason,
		});

		// Generate unique token id
		const refreshTokenId = crypto.randomUUID();

		const payload: JwtPayload = {
			sub: user.id,
			phone: user.phone,
			sid: refreshTokenId,
		};

		const { accessToken, refreshToken } = await this.generateTokens(payload);

		const refreshTokenHash = await bcrypt.hash(refreshToken, 12);
		const ua = req.headers["user-agent"];

		const userAgent = this.getUserAgent(req);

		await this.prisma.$transaction([
			this.prisma.session.create({
				data: {
					userId: user.id,
					refreshTokenId,
					refreshTokenHash,
					deviceId: dto.deviceId,
					platform: getPlatform(userAgent),
					deviceName: getDeviceName(userAgent),
					ipAddress: this.getClientIp(req),
					userAgent,
					loginMethod: LoginMethod.PASSWORD,
					lastUsedAt: new Date(),
					expiresAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
				},
			}),

			this.prisma.user.update({
				where: {
					id: user.id,
				},
				data: {
					lastLoginAt: new Date(),
					lastIpAddress: this.getClientIp(req),
				},
			}),

			this.prisma.session.deleteMany({
				where: {
					expiresAt: {
						lt: new Date(),
					},
				},
			}),
		]);

		this.setAuthCookies(res, accessToken, refreshToken);

		return {
			message: AppMessages.auth.loginSuccess,

			data: {
				accessToken,

				user: {
					id: user.id,
					handle: user.handle,
					fullName: user.fullName,
					email: user.email,
					phone: user.phone,
					avatarUrl: user.avatarUrl,
					status: user.status,
					isVerified: user.isVerified,
					kycTier: user.kyc_tier,
				},
			},
		};
	}

	async refreshToken(req: Request, res: Response) {
		const refreshToken = req.cookies?.refreshToken;

		if (!refreshToken) {
			throw new UnauthorizedException(AppMessages.auth.invalidToken);
		}

		let payload: JwtPayload;

		try {
			payload = await this.jwt.verifyAsync<JwtPayload>(refreshToken, {
				secret: configs.jwt.refreshSecret,
			});
		} catch {
			throw new UnauthorizedException(AppMessages.auth.invalidToken);
		}

		const session = await this.prisma.session.findUnique({
			where: {
				refreshTokenId: payload.sid,
			},
			include: {
				user: true,
			},
		});

		if (!session) {
			throw new UnauthorizedException(AppMessages.auth.invalidToken);
		}

		if (session.expiresAt < new Date()) {
			await this.prisma.session.delete({
				where: {
					id: session.id,
				},
			});

			throw new UnauthorizedException(AppMessages.auth.invalidToken);
		}

		const matched = await bcrypt.compare(
			refreshToken,
			session.refreshTokenHash,
		);

		if (!matched) {
			await this.prisma.session.delete({
				where: {
					id: session.id,
				},
			});

			throw new UnauthorizedException(AppMessages.auth.invalidToken);
		}

		this.validateUserStatus({
			status: session.user.status,
			statusReason: session.user.statusReason,
		});

		// Rotate Token ID
		const newRefreshTokenId = crypto.randomUUID();

		const newPayload: JwtPayload = {
			sub: session.user.id,
			phone: session.user.phone,
			sid: newRefreshTokenId,
		};

		const { accessToken, refreshToken: newRefreshToken } =
			await this.generateTokens(newPayload);

		await this.prisma.session.update({
			where: {
				id: session.id,
			},
			data: {
				refreshTokenId: newRefreshTokenId,
				refreshTokenHash: await bcrypt.hash(newRefreshToken, 12),
				lastUsedAt: new Date(),
				expiresAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
			},
		});

		this.setAuthCookies(res, accessToken, newRefreshToken);

		return {
			message: AppMessages.auth.tokenRefreshed,

			data: {
				accessToken,
			},
		};
	}

	async logout(req: Request, res: Response) {
		const refreshToken = req.cookies?.refreshToken;

		if (refreshToken) {
			try {
				const payload = await this.jwt.verifyAsync<JwtPayload>(refreshToken, {
					secret: configs.jwt.refreshSecret,
				});

				await this.prisma.session.updateMany({
					where: {
						refreshTokenId: payload.sid,
						revokedAt: null,
					},
					data: {
						revokedAt: new Date(),
					},
				});
			} catch {
				// Invalid/expired refresh token
			}
		}

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
			message: AppMessages.auth.logoutSuccess,
		};
	}
	async logoutAllDevices(userId: string, res: Response) {
		await this.prisma.session.updateMany({
			where: {
				userId,
				revokedAt: null,
			},
			data: {
				revokedAt: new Date(),
			},
		});

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
			message: AppMessages.auth.logoutSuccess,
		};
	}
}
