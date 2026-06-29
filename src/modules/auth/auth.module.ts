import { Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { PassportModule } from "@nestjs/passport";
import { AuthService } from "./auth.service";
import { AuthController } from "./auth.controller";
import { JwtStrategy } from "./strategies/jwt.strategy";
import type { StringValue } from "ms";
import { configs } from "@/config";

@Module({
	imports: [
		PassportModule,
		JwtModule.register({
			secret: configs.jwt.secret,
			signOptions: {
				expiresIn: configs.jwt.expiresIn as StringValue,
			},
		}),
	],
	controllers: [AuthController],
	providers: [AuthService, JwtStrategy],
	exports: [AuthService, JwtModule],
})
export class AuthModule {}
