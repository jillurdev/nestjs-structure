import { Controller, Post, Get, Body, Req, Res } from "@nestjs/common";
import { LoginDto } from "./dto/login.dto";
import { AuthService } from "./auth.service";
import { Request, Response } from "express";
import httpStatus from "http-status";
import { responseHandler } from "@/common/helpers";
import { Public } from "@/common/decorators/public.decorator";
import { AppMessages } from "@/common/AppMessages/app.messages";
import { Throttle } from "@nestjs/throttler";

@Controller("auth")
export class AuthController {
	constructor (private readonly authService: AuthService) { }
	
	@Throttle({ short: { limit: 3, ttl: 60000 } })
	@Public()
	@Post("login")
	async login(@Body() dto: LoginDto, @Res() res: Response) {
		const data = await this.authService.login(dto, res);
		responseHandler(res, {
			statusCode: httpStatus.OK,
			success: true,
			message: AppMessages.auth.loginSuccess,
			data,
		});
	}

	@Public()
	@Post("refresh")
	async refresh(@Req() req: Request, @Res() res: Response) {
		const token = req.cookies?.refreshToken;
		const data = await this.authService.refreshToken(token, res);
		responseHandler(res, {
			statusCode: httpStatus.OK,
			success: true,
			message: AppMessages.auth.tokenRefreshed,
			data,
		});
	}

	@Get("me")
	async getMe(@Req() req: any, @Res() res: Response) {
		responseHandler(res, {
			statusCode: httpStatus.OK,
			success: true,
			message: AppMessages.user.retrieved,
			data: req.user,
		});
	}

	@Post("logout")
	async logout(@Req() req: any, @Res() res: Response) {
		const data = await this.authService.logout(req.user.id, res);
		responseHandler(res, {
			statusCode: httpStatus.OK,
			success: true,
			message: AppMessages.auth.logoutSuccess,
			data,
		});
	}
}
