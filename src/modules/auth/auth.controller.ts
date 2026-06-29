import { Body, Controller, Get, Patch, Post, Req, Res } from "@nestjs/common";
import { Request, Response } from "express";
import { Throttle } from "@nestjs/throttler";

import { AuthService } from "./auth.service";

import { Public } from "@/common/decorators/public.decorator";
import { CurrentUser } from "@/common/decorators/current-user.decorator";

import { RegisterDto } from "./dto/register.dto";
import { LoginDto } from "./dto/login.dto";
import { ChangePasswordDto } from "../users/dto/change-password.dto";
import { JwtUser } from "@/common/interfaces/jwt-user.interface";

@Controller("auth")
export class AuthController {
	constructor(private readonly authService: AuthService) {}

	// Register
	@Public()
	@Post("register")
	async register(
		@Body() dto: RegisterDto,
		@Req() req: Request,
		@Res({ passthrough: true }) res: Response,
	) {
		return this.authService.register(dto, req, res);
	}

	// Login

	@Public()
	@Throttle({
		login: {
			limit: 5,
			ttl: 60,
		},
	})
	@Post("login")
	async login(
		@Body() dto: LoginDto,
		@Req() req: Request,
		@Res({ passthrough: true }) res: Response,
	) {
		return this.authService.login(dto, req, res);
	}

	// Refresh Access Token

	@Public()
	@Post("refresh")
	async refreshToken(
		@Req() req: Request,
		@Res({ passthrough: true }) res: Response,
	) {
		return this.authService.refreshToken(req, res);
	}

	// Logout Current Device

	@Post("logout")
	async logout(@Req() req: Request, @Res({ passthrough: true }) res: Response) {
		return this.authService.logout(req, res);
	}

	// Logout All Devices

	@Post("logout-all")
	async logoutAllDevices(
		@CurrentUser() user: JwtUser,
		@Res({ passthrough: true }) res: Response,
	) {
		return this.authService.logoutAllDevices(user.id, res);
	}

	 
}
