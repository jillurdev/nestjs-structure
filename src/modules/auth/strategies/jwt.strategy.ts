import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { PrismaService } from "@/database/prisma/prisma.service";
import { Request } from "express";
import { configs } from "@/config";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
	constructor(private readonly prisma: PrismaService) {
		super({
			jwtFromRequest: ExtractJwt.fromExtractors([
				(req: Request) => req?.cookies?.accessToken,
				ExtractJwt.fromAuthHeaderAsBearerToken(),
			]),
			secretOrKey: configs.jwt.secret,
		});
	}

	async validate(payload: { sub: string; phone: string; role: string }) {
		const user = await this.prisma.user.findUnique({
			where: { id: payload.sub },
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
			},
		});

		if (!user) throw new UnauthorizedException();
		if (!user.isActive)
			throw new UnauthorizedException("Account is not active");
		if (user.isBanned) throw new UnauthorizedException("Account is banned");

		return user;
	}
}
