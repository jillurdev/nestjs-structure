import { AdminService } from "./admin.service";
import { GiveBonusDto } from "./dto/admin.dto";
import { Response } from "express";
export declare class AdminController {
    private readonly adminService;
    constructor(adminService: AdminService);
    getDashboard(res: Response): Promise<void>;
    getRevenue(res: Response, days?: string): Promise<void>;
    getSettings(res: Response): Promise<void>;
    giveBonus(id: string, dto: GiveBonusDto, user: any, res: Response): Promise<void>;
}
