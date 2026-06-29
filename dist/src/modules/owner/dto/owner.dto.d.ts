export declare class CreateAdminDto {
    name: string;
    phone: string;
    password: string;
    email?: string;
}
export declare class UpdateSettingDto {
    value: string;
}
export declare class UpdateMultipleSettingsDto {
    settings: Record<string, string>;
}
export declare class GiveBonusDto {
    amount: number;
    reason: string;
}
export declare class RevenueDto {
    admobRevenue?: number;
    adsenseRevenue?: number;
    unityRevenue?: number;
    otherRevenue?: number;
    totalPaidOut?: number;
}
export declare class MaintenanceDto {
    enabled: boolean;
}
export declare class ForceUpdateDto {
    enabled: boolean;
    version: string;
}
