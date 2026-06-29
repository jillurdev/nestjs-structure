import {
	Controller,
	Get,
	Post,
	Body,
	Param,
	Query,
	Req,
	Res,
} from "@nestjs/common";
import { AdminService } from "./admin.service";
import { GiveBonusDto } from "./dto/admin.dto";
import { Response } from "express";
import httpStatus from "http-status";
import { responseHandler } from "@/common/helpers";
import { Roles, Role } from "@/common/decorators/roles.decorator";
import { AppMessages } from "@/common/AppMessages/app.messages";
import { CurrentUser } from "@/common/decorators/current-user.decorator";

@Roles(Role.ADMIN, Role.OWNER)
@Controller("admin")
export class AdminController {
	constructor(private readonly adminService: AdminService) {}

	@Get("dashboard")
	async getDashboard(@Res() res: Response) {
		const data = await this.adminService.getDashboardStats();
		responseHandler(res, {
			statusCode: httpStatus.OK,
			success: true,
			message: AppMessages.admin.dashboardRetrieved,
			data,
		});
	}

	@Get("revenue")
	async getRevenue(@Res() res: Response, @Query("days") days?: string) {
		const data = await this.adminService.getRevenueRecords(
			days ? parseInt(days) : 30,
		);
		responseHandler(res, {
			statusCode: httpStatus.OK,
			success: true,
			message: AppMessages.owner.revenueRetrieved,
			data,
		});
	}

	@Get("settings")
	async getSettings(@Res() res: Response) {
		const data = await this.adminService.getSettings();
		responseHandler(res, {
			statusCode: httpStatus.OK,
			success: true,
			message: AppMessages.owner.settingsRetrieved,
			data,
		});
	}

	@Post("users/:id/bonus")
	async giveBonus(
		@Param("id") id: string,
		@Body() dto: GiveBonusDto,
		@CurrentUser() user: any,
		@Res() res: Response,
	) {
		const data = await this.adminService.giveBonus(
			id,
			dto.amount,
			dto.reason,
			user.id,
		);
		responseHandler(res, {
			statusCode: httpStatus.OK,
			success: true,
			message: AppMessages.owner.bonusGiven(dto.amount, data.userName),
			data,
		});
	}
}
