import { Controller, Get, Post, Body, Param, Query, Res } from "@nestjs/common";
import { WithdrawalService } from "./withdrawal.service";
import {
	ApproveWithdrawalDto,
	CreateWithdrawalDto,
	RejectWithdrawalDto,
} from "./dto/withdrawal.dto";
import { Response } from "express";
import { WithdrawalStatus } from "@prisma/client";
import httpStatus from "http-status";
import { responseHandler } from "@/common/helpers";
import { Roles, Role } from "@/common/decorators/roles.decorator";
import { CurrentUser } from "@/common/decorators/current-user.decorator";
import { AppMessages } from "@/common/AppMessages/app.messages";

@Controller("withdrawal")
export class WithdrawalController {
	constructor(private readonly withdrawalService: WithdrawalService) {}

	@Get("wallet")
	async getWallet(@CurrentUser() user: any, @Res() res: Response) {
		const data = await this.withdrawalService.getWalletSummary(user.id);
		responseHandler(res, {
			statusCode: httpStatus.OK,
			success: true,
			message: AppMessages.withdrawal.retrieved,
			data,
		});
	}

	@Post("request")
	async requestWithdrawal(
		@Body() dto: CreateWithdrawalDto,
		@CurrentUser() user: any,
		@Res() res: Response,
	) {
		const data = await this.withdrawalService.requestWithdrawal(user.id, dto);
		responseHandler(res, {
			statusCode: httpStatus.CREATED,
			success: true,
			message: AppMessages.withdrawal.requested,
			data,
		});
	}

	@Get("history")
	async getHistory(
		@CurrentUser() user: any,
		@Res() res: Response,
		@Query("page") page?: string,
		@Query("limit") limit?: string,
	) {
		const data = await this.withdrawalService.getUserWithdrawals(
			user.id,
			page ? parseInt(page) : 1,
			limit ? parseInt(limit) : 10,
		);
		responseHandler(res, {
			statusCode: httpStatus.OK,
			success: true,
			message: AppMessages.withdrawal.historyRetrieved,
			data: data.withdrawals,
			meta: data.meta,
		});
	}

	@Roles(Role.ADMIN, Role.OWNER)
	@Get("admin/all")
	async getAllWithdrawals(
		@CurrentUser() user: any,
		@Res() res: Response,
		@Query("status") status?: WithdrawalStatus,
		@Query("page") page?: string,
		@Query("limit") limit?: string,
	) {
		const data = await this.withdrawalService.getAllWithdrawals(
			status,
			page ? parseInt(page) : 1,
			limit ? parseInt(limit) : 20,
		);
		responseHandler(res, {
			statusCode: httpStatus.OK,
			success: true,
			message: AppMessages.withdrawal.retrieved,
			data: data.withdrawals,
			meta: data.meta,
		});
	}

	@Roles(Role.ADMIN, Role.OWNER)
	@Post("admin/:id/approve")
	async approve(
		@Param("id") id: string,
		@Body() dto: ApproveWithdrawalDto,
		@CurrentUser() user: any,
		@Res() res: Response,
	) {
		const data = await this.withdrawalService.approveWithdrawal(
			id,
			user.id,
			dto.adminNote,
		);
		responseHandler(res, {
			statusCode: httpStatus.OK,
			success: true,
			message: AppMessages.withdrawal.approved,
			data,
		});
	}

	@Roles(Role.ADMIN, Role.OWNER)
	@Post("admin/:id/reject")
	async reject(
		@Param("id") id: string,
		@Body() dto: RejectWithdrawalDto,
		@CurrentUser() user: any,
		@Res() res: Response,
	) {
		const data = await this.withdrawalService.rejectWithdrawal(
			id,
			user.id,
			dto.adminNote,
		);
		responseHandler(res, {
			statusCode: httpStatus.OK,
			success: true,
			message: AppMessages.withdrawal.rejected,
			data,
		});
	}
}
