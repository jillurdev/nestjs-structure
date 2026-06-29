import {
	Controller,
	Get,
	Post,
	Param,
	Query,
	Req,
	Res,
	Body,
} from "@nestjs/common";
import { NotificationService } from "./notification.service";
import { Response } from "express";
import httpStatus from "http-status";
import { responseHandler } from "@/common/helpers";
import { Roles, Role } from "@/common/decorators/roles.decorator";
import { NotificationType } from "@prisma/client";
import { IsEnum, IsString } from "class-validator";

class SendNotificationDto {
	@IsEnum(NotificationType)
	type: NotificationType;

	@IsString()
	title: string;

	@IsString()
	body: string;
}

@Controller("notifications")
export class NotificationController {
	constructor(private readonly notificationService: NotificationService) {}

	@Get()
	async getNotifications(
		@Req() req: any,
		@Res() res: Response,
		@Query("page") page?: string,
		@Query("limit") limit?: string,
	) {
		const data = await this.notificationService.getUserNotifications(
			req.user.id,
			page ? parseInt(page) : 1,
			limit ? parseInt(limit) : 20,
		);
		responseHandler(res, {
			statusCode: httpStatus.OK,
			success: true,
			message: "Notifications retrieved",
			data: data.notifications,
			meta: data.meta,
		});
	}

	@Post(":id/read")
	async markAsRead(
		@Param("id") id: string,
		@Req() req: any,
		@Res() res: Response,
	) {
		const data = await this.notificationService.markAsRead(req.user.id, id);
		responseHandler(res, {
			statusCode: httpStatus.OK,
			success: true,
			message: "Notification marked as read",
			data,
		});
	}

	@Post("read-all")
	async markAllAsRead(@Req() req: any, @Res() res: Response) {
		const data = await this.notificationService.markAllAsRead(req.user.id);
		responseHandler(res, {
			statusCode: httpStatus.OK,
			success: true,
			message: data.message,
			data,
		});
	}

	@Roles(Role.ADMIN, Role.OWNER)
	@Post("send-all")
	async sendToAll(@Body() dto: SendNotificationDto, @Res() res: Response) {
		const data = await this.notificationService.sendToAll(
			dto.type,
			dto.title,
			dto.body,
		);
		responseHandler(res, {
			statusCode: httpStatus.OK,
			success: true,
			message: `Notification sent to ${data.sent} users`,
			data,
		});
	}
}
