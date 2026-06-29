import {
	Injectable,
	UnauthorizedException,
	ForbiddenException,
} from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { Request } from "express";

import { PrismaService } from "@/database/prisma/prisma.service";
import { configs } from "@/config";
import { UserStatus } from "@prisma/client";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
	constructor(private readonly prisma: PrismaService) {
		super({
			jwtFromRequest: ExtractJwt.fromExtractors([
				(req: Request) => req?.cookies?.accessToken,
				ExtractJwt.fromAuthHeaderAsBearerToken(),
			]),
			ignoreExpiration: false,
			secretOrKey: configs.jwt.secret,
		});
	}

	async validate(payload: { sub: string; phone: string }) {
		const user = await this.prisma.findUserByIdOrThrow(payload.sub, {
			select: {
				id: true,
				handle: true,
				fullName: true,
				email: true,
				phone: true,
				avatarUrl: true,
				isVerified: true,
				status: true,
				kyc_tier: true,
			},
		});

		switch (user.status) {
			case UserStatus.ACTIVE:
				break;

			case UserStatus.PENDING_VERIFICATION:
				throw new ForbiddenException("Your account is pending verification.");

			case UserStatus.SUSPENDED:
				throw new ForbiddenException("Your account has been suspended.");

			case UserStatus.BANNED:
				throw new ForbiddenException("Your account has been banned.");

			case UserStatus.CLOSED:
				throw new ForbiddenException("Your account has been closed.");

			default:
				throw new UnauthorizedException();
		}

		return user;
	}
}
