import { WithdrawalService } from "./withdrawal.service";
import { ApproveWithdrawalDto, CreateWithdrawalDto, RejectWithdrawalDto } from "./dto/withdrawal.dto";
import { Response } from "express";
import { WithdrawalStatus } from "@prisma/client";
export declare class WithdrawalController {
    private readonly withdrawalService;
    constructor(withdrawalService: WithdrawalService);
    getWallet(user: any, res: Response): Promise<void>;
    requestWithdrawal(dto: CreateWithdrawalDto, user: any, res: Response): Promise<void>;
    getHistory(user: any, res: Response, page?: string, limit?: string): Promise<void>;
    getAllWithdrawals(user: any, res: Response, status?: WithdrawalStatus, page?: string, limit?: string): Promise<void>;
    approve(id: string, dto: ApproveWithdrawalDto, user: any, res: Response): Promise<void>;
    reject(id: string, dto: RejectWithdrawalDto, user: any, res: Response): Promise<void>;
}
