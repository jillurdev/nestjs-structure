import { TopupService } from "./topup.service";
import { CreateTopupDto, ProcessTopupDto } from "./dto/topup.dto";
import { Response } from "express";
import { TopupStatus } from "@prisma/client";
export declare class TopupController {
    private readonly topupService;
    constructor(topupService: TopupService);
    requestTopup(dto: CreateTopupDto, user: any, res: Response): Promise<void>;
    getHistory(user: any, res: Response, page?: string, limit?: string): Promise<void>;
    getAllTopups(res: Response, status?: TopupStatus, page?: string, limit?: string): Promise<void>;
    approve(id: string, dto: ProcessTopupDto, user: any, res: Response): Promise<void>;
    reject(id: string, dto: ProcessTopupDto, user: any, res: Response): Promise<void>;
}
