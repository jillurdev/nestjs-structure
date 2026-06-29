import {
	Controller,
	Get,
	Post,
	Delete,
	Body,
	Param,
	Query,
	Req,
	Res,
} from "@nestjs/common";
import { OwnerService } from "./owner.service";
import {
	CreateAdminDto,
	UpdateSettingDto,
	UpdateMultipleSettingsDto,
	GiveBonusDto,
	RevenueDto,
	MaintenanceDto,
	ForceUpdateDto,
} from "./dto/owner.dto";
import { Response } from "express";
import httpStatus from "http-status";
import { responseHandler } from "@/common/helpers";
import { Roles, Role } from "@/common/decorators/roles.decorator";
import { AppMessages } from "@/common/AppMessages/app.messages";

@Roles(Role.OWNER)
@Controller("owner")
export class OwnerController {
	constructor(private readonly ownerService: OwnerService) {}

	// ─── Overview ─────────────────────────────────────────────────
	@Get("overview")
	async getOverview(@Res() res: Response) {
		const data = await this.ownerService.getOverview();
		responseHandler(res, {
			statusCode: httpStatus.OK,
			success: true,
			message: AppMessages.owner.overviewRetrieved,
			data,
		});
	}

	// ─── Admin Management ─────────────────────────────────────────
	@Get("admins")
	async getAdmins(@Res() res: Response) {
		const data = await this.ownerService.getAdmins();
		responseHandler(res, {
			statusCode: httpStatus.OK,
			success: true,
			message: AppMessages.admin.retrieved,
			data,
		});
	}

	@Post("admins")
	async createAdmin(@Body() dto: CreateAdminDto, @Res() res: Response) {
		const data = await this.ownerService.createAdmin(dto);
		responseHandler(res, {
			statusCode: httpStatus.CREATED,
			success: true,
			message: AppMessages.admin.created,
			data,
		});
	}

	@Post("admins/:id/toggle")
	async toggleAdmin(@Param("id") id: string, @Res() res: Response) {
		const data = await this.ownerService.toggleAdminStatus(id);
		responseHandler(res, {
			statusCode: httpStatus.OK,
			success: true,
			message: AppMessages.admin.statusUpdated,
			data,
		});
	}

	@Delete("admins/:id")
	async deleteAdmin(@Param("id") id: string, @Res() res: Response) {
		const data = await this.ownerService.deleteAdmin(id);
		responseHandler(res, {
			statusCode: httpStatus.OK,
			success: true,
			message: AppMessages.admin.deleted,
			data,
		});
	}

	// ─── App Settings ─────────────────────────────────────────────
	@Get("settings")
	async getSettings(@Res() res: Response) {
		const data = await this.ownerService.getSettings();
		responseHandler(res, {
			statusCode: httpStatus.OK,
			success: true,
			message: AppMessages.owner.settingsRetrieved,
			data,
		});
	}

	@Post("settings/:key")
	async updateSetting(
		@Param("key") key: string,
		@Body() dto: UpdateSettingDto,
		@Req() req: any,
		@Res() res: Response,
	) {
		const data = await this.ownerService.updateSetting(
			key,
			dto.value,
			req.user.id,
		);
		responseHandler(res, {
			statusCode: httpStatus.OK,
			success: true,
			message: AppMessages.owner.settingUpdated,
			data,
		});
	}

	@Post("settings")
	async updateMultipleSettings(
		@Body() dto: UpdateMultipleSettingsDto,
		@Req() req: any,
		@Res() res: Response,
	) {
		const data = await this.ownerService.updateMultipleSettings(
			dto.settings,
			req.user.id,
		);
		responseHandler(res, {
			statusCode: httpStatus.OK,
			success: true,
			message: AppMessages.owner.settingsUpdated,
			data,
		});
	}

	// ─── Revenue ──────────────────────────────────────────────────
	@Get("revenue")
	async getRevenue(@Res() res: Response, @Query("days") days?: string) {
		const data = await this.ownerService.getRevenueRecords(
			days ? parseInt(days) : 30,
		);
		responseHandler(res, {
			statusCode: httpStatus.OK,
			success: true,
			message: AppMessages.owner.revenueRetrieved,
			data,
		});
	}

	@Post("revenue")
	async updateRevenue(
		@Body() dto: RevenueDto,
		@Query("date") date: string,
		@Res() res: Response,
	) {
		const data = await this.ownerService.upsertRevenueRecord(
			date ? new Date(date) : new Date(),
			dto,
		);
		responseHandler(res, {
			statusCode: httpStatus.OK,
			success: true,
			message: AppMessages.owner.revenueUpdated,
			data,
		});
	}

	// ─── Bonus ────────────────────────────────────────────────────
	@Post("users/:id/bonus")
	async giveBonus(
		@Param("id") id: string,
		@Body() dto: GiveBonusDto,
		@Req() req: any,
		@Res() res: Response,
	) {
		const data = await this.ownerService.giveBonus(
			id,
			dto.amount,
			dto.reason,
			req.user.id,
		);
		responseHandler(res, {
			statusCode: httpStatus.OK,
			success: true,
			message: AppMessages.owner.bonusGiven(dto.amount, data.userName),
			data,
		});
	}

	// ─── Maintenance ──────────────────────────────────────────────
	@Post("maintenance")
	async setMaintenance(
		@Body() dto: MaintenanceDto,
		@Req() req: any,
		@Res() res: Response,
	) {
		const data = await this.ownerService.setMaintenanceMode(
			dto.enabled,
			req.user.id,
		);
		responseHandler(res, {
			statusCode: httpStatus.OK,
			success: true,
			message: dto.enabled
				? AppMessages.owner.maintenanceEnabled
				: AppMessages.owner.maintenanceDisabled,
			data,
		});
	}

	// ─── Force Update ─────────────────────────────────────────────
	@Post("force-update")
	async setForceUpdate(
		@Body() dto: ForceUpdateDto,
		@Req() req: any,
		@Res() res: Response,
	) {
		const data = await this.ownerService.setForceUpdate(
			dto.enabled,
			dto.version,
			req.user.id,
		);
		responseHandler(res, {
			statusCode: httpStatus.OK,
			success: true,
			message: AppMessages.owner.forceUpdateSet(dto.version),
			data,
		});
	}
}
