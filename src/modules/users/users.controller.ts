import {
	Controller,
	Get,
	Param,
	Post,
	Body,
	Put,
	Delete,
	Req,
	Res,
	Patch,
} from "@nestjs/common";
import { UsersService } from "./users.service";
import { UpdateUserDto } from "./dto/update-user.dto";
import { Response } from "express";
import httpStatus from "http-status";
import { responseHandler } from "@/common/helpers";

import { Roles, Role } from "@/common/decorators/roles.decorator";
import { AppMessages } from "@/common/AppMessages/app.messages";
import { CreateUserDto } from "./dto/create-user.dto";
import { Public } from "@/common/decorators/public.decorator";
import { CurrentUser } from "@/common/decorators/current-user.decorator";
import { ChangePasswordDto } from "./dto/change-password.dto";

@Controller("users")
export class UsersController {
	constructor(private readonly usersService: UsersService) {}

	@Public()
	@Post("register")
	async register(@Body() dto: CreateUserDto, @Res() res: Response) {
		const data = await this.usersService.createUser(dto);
		responseHandler(res, {
			statusCode: httpStatus.CREATED,
			success: true,
			message: AppMessages.auth.registerSuccess,
			data,
		});
	}

	@Get("me")
	async getMe(@Req() req: any, @Res() res: Response) {
		const data = await this.usersService.findUserById(req.user.id);
		responseHandler(res, {
			statusCode: httpStatus.OK,
			success: true,
			message: AppMessages.user.retrieved,
			data,
		});
	}

	@Get("me/stats")
	async getMyStats(@Req() req: any, @Res() res: Response) {
		const data = await this.usersService.getUserStats(req.user.id);
		responseHandler(res, {
			statusCode: httpStatus.OK,
			success: true,
			message: AppMessages.user.retrieved,
			data,
		});
	}

	@Post("me/fcm-token")
	async saveFcmToken(
		@Body() body: { fcmToken: string },
		@Req() req: any,
		@Res() res: Response,
	) {
		const data = await this.usersService.saveFcmToken(
			req.user.id,
			body.fcmToken,
		);
		responseHandler(res, {
			statusCode: httpStatus.OK,
			success: true,
			message: "FCM token saved",
			data,
		});
	}

	@Get(":id")
	async getUser(@Param("id") id: string, @Res() res: Response) {
		const data = await this.usersService.findUserById(id);
		responseHandler(res, {
			statusCode: httpStatus.OK,
			success: true,
			message: AppMessages.user.retrieved,
			data,
		});
	}

	@Put(":id")
	async updateUser(
		@Param("id") id: string,
		@Body() dto: UpdateUserDto,
		@Res() res: Response,
	) {
		const data = await this.usersService.updateUser(id, dto);
		responseHandler(res, {
			statusCode: httpStatus.OK,
			success: true,
			message: AppMessages.user.profileUpdated,
			data,
		});
	}

	@Patch("me")
	async updateMe(
		@CurrentUser() user: { id: string },
		@Body() dto: UpdateUserDto,
		@Res() res: Response,
	) {
		const data = await this.usersService.updateUser(user.id, dto);
		responseHandler(res, {
			statusCode: httpStatus.OK,
			success: true,
			message: AppMessages.user.profileUpdated,
			data,
		});
	}

	@Patch("me/password")
	async changePassword(
		@CurrentUser() user: { id: string },
		@Body() dto: ChangePasswordDto,
		@Res() res: Response,
	) {
		await this.usersService.changePassword(
			user.id,
			dto.currentPassword,
			dto.newPassword,
		);
		responseHandler(res, {
			statusCode: httpStatus.OK,
			success: true,
			message: AppMessages.user.passwordChanged,
			data: null,
		});
	}

	// protected routes for admin/owner 
	@Roles(Role.ADMIN, Role.OWNER)
	@Get()
	async getAllUsers(@Res() res: Response) {
		const data = await this.usersService.findAllUsers();
		responseHandler(res, {
			statusCode: httpStatus.OK,
			success: true,
			message: AppMessages.user.retrieved,
			data,
		});
	}

	@Roles(Role.ADMIN, Role.OWNER)
	@Post(":id/ban")
	async banUser(
		@Param("id") id: string,
		@Body() body: { reason: string },
		@Req() req: any,
		@Res() res: Response,
	) {
		const data = await this.usersService.banUser(id, body.reason, req.user.id);
		responseHandler(res, {
			statusCode: httpStatus.OK,
			success: true,
			message: AppMessages.user.banned(body.reason),
			data,
		});
	}

	@Roles(Role.ADMIN, Role.OWNER)
	@Post(":id/unban")
	async unbanUser(@Param("id") id: string, @Res() res: Response) {
		const data = await this.usersService.unbanUser(id);
		responseHandler(res, {
			statusCode: httpStatus.OK,
			success: true,
			message: AppMessages.user.unbanned,
			data,
		});
	}

	@Roles(Role.OWNER)
	@Delete(":id")
	async deleteUser(@Param("id") id: string, @Res() res: Response) {
		const data = await this.usersService.deleteUser(id);
		responseHandler(res, {
			statusCode: httpStatus.OK,
			success: true,
			message: AppMessages.user.deleted,
			data,
		});
	}
}
