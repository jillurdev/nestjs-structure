import { OwnerService } from "./owner.service";
import { CreateAdminDto, UpdateSettingDto, UpdateMultipleSettingsDto, GiveBonusDto, RevenueDto, MaintenanceDto, ForceUpdateDto } from "./dto/owner.dto";
import { Response } from "express";
export declare class OwnerController {
    private readonly ownerService;
    constructor(ownerService: OwnerService);
    getOverview(res: Response): Promise<void>;
    getAdmins(res: Response): Promise<void>;
    createAdmin(dto: CreateAdminDto, res: Response): Promise<void>;
    toggleAdmin(id: string, res: Response): Promise<void>;
    deleteAdmin(id: string, res: Response): Promise<void>;
    getSettings(res: Response): Promise<void>;
    updateSetting(key: string, dto: UpdateSettingDto, req: any, res: Response): Promise<void>;
    updateMultipleSettings(dto: UpdateMultipleSettingsDto, req: any, res: Response): Promise<void>;
    getRevenue(res: Response, days?: string): Promise<void>;
    updateRevenue(dto: RevenueDto, date: string, res: Response): Promise<void>;
    giveBonus(id: string, dto: GiveBonusDto, req: any, res: Response): Promise<void>;
    setMaintenance(dto: MaintenanceDto, req: any, res: Response): Promise<void>;
    setForceUpdate(dto: ForceUpdateDto, req: any, res: Response): Promise<void>;
}
