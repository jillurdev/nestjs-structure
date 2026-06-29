import { PrismaService } from "@/database/prisma/prisma.service";
import { Cache } from "cache-manager";
export declare class OwnerService {
    private readonly prisma;
    private cacheManager;
    constructor(prisma: PrismaService, cacheManager: Cache);
    getOverview(): Promise<{
        users: {
            total: number;
            active: number;
            banned: number;
            premium: number;
            basic: number;
            admins: number;
            todayNew: number;
            monthNew: number;
        };
        ads: {
            totalWatched: number;
            todayWatched: number;
            todayEarnings: number | import("@prisma/client-runtime-utils").Decimal;
            monthEarnings: number | import("@prisma/client-runtime-utils").Decimal;
        };
        finance: {
            totalPaidOut: number | import("@prisma/client-runtime-utils").Decimal;
            totalUserBalance: number | import("@prisma/client-runtime-utils").Decimal;
            totalEarned: number | import("@prisma/client-runtime-utils").Decimal;
            pendingWithdrawals: number;
            approvedWithdrawals: number;
        };
    }>;
    createAdmin(data: {
        name: string;
        phone: string;
        password: string;
        email?: string;
    }): Promise<{
        id: string;
        createdAt: Date;
        name: string;
        email: string | null;
        phone: string;
        role: import(".prisma/client").$Enums.Role;
    }>;
    getAdmins(): Promise<{
        id: string;
        isActive: boolean;
        createdAt: Date;
        name: string;
        email: string | null;
        phone: string;
        lastLoginAt: Date | null;
    }[]>;
    toggleAdminStatus(adminId: string): Promise<{
        id: string;
        isActive: boolean;
    }>;
    deleteAdmin(adminId: string): Promise<void>;
    getSettings(): Promise<Record<string, string>>;
    updateSetting(key: string, value: string, ownerId: string): Promise<{
        id: string;
        description: string | null;
        updatedAt: Date;
        key: string;
        value: string;
        updatedBy: string | null;
    }>;
    updateMultipleSettings(settings: Record<string, string>, ownerId: string): Promise<void>;
    getRevenueRecords(days?: number): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        date: Date;
        admobRevenue: import("@prisma/client-runtime-utils").Decimal;
        adsenseRevenue: import("@prisma/client-runtime-utils").Decimal;
        unityRevenue: import("@prisma/client-runtime-utils").Decimal;
        otherRevenue: import("@prisma/client-runtime-utils").Decimal;
        totalRevenue: import("@prisma/client-runtime-utils").Decimal;
        totalPaidOut: import("@prisma/client-runtime-utils").Decimal;
        profit: import("@prisma/client-runtime-utils").Decimal;
    }[]>;
    upsertRevenueRecord(date: Date, data: {
        admobRevenue?: number;
        adsenseRevenue?: number;
        unityRevenue?: number;
        otherRevenue?: number;
        totalPaidOut?: number;
    }): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        date: Date;
        admobRevenue: import("@prisma/client-runtime-utils").Decimal;
        adsenseRevenue: import("@prisma/client-runtime-utils").Decimal;
        unityRevenue: import("@prisma/client-runtime-utils").Decimal;
        otherRevenue: import("@prisma/client-runtime-utils").Decimal;
        totalRevenue: import("@prisma/client-runtime-utils").Decimal;
        totalPaidOut: import("@prisma/client-runtime-utils").Decimal;
        profit: import("@prisma/client-runtime-utils").Decimal;
    }>;
    giveBonus(userId: string, amount: number, reason: string, ownerId: string): Promise<{
        userName: string;
    }>;
    setMaintenanceMode(enabled: boolean, ownerId: string): Promise<{
        maintenanceMode: boolean;
    }>;
    setForceUpdate(enabled: boolean, version: string, ownerId: string): Promise<{
        forceUpdate: boolean;
        version: string;
    }>;
}
