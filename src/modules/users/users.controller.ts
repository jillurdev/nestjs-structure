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
import { Response } from "express";

import { CurrentUser } from "@/common/decorators/current-user.decorator";
import { ChangePasswordDto } from "./dto/change-password.dto";
import { JwtUser } from "@/common/interfaces/jwt-user.interface";

@Controller("users")
export class UsersController {
	constructor(private readonly usersService: UsersService) {}

	// Current User
	@Get("me")
	async me(@CurrentUser() user: JwtUser) {
		return this.usersService.me(user.id);
	}

	//    change password
	@Patch("change-password")
	async changePassword(
		@CurrentUser() user: JwtUser,
		@Body() dto: ChangePasswordDto,
		@Res({ passthrough: true }) res: Response,
	) {
		return this.usersService.changePassword(user.id, dto, res);
	}
}
