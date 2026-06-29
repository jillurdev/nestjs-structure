import { PrismaService } from "@/database/prisma/prisma.service";
import { NotificationService } from "../notification/notification.service";
export declare class AdminService {
    private readonly prisma;
    private readonly notificationService;
    constructor(prisma: PrismaService, notificationService: NotificationService);
    getDashboardStats(): Promise<{
        users: {
            total: number;
            active: number;
            premium: number;
            todayNew: number;
        };
        ads: {
            totalWatched: number;
            todayWatched: number;
            todayEarnings: number | import("@prisma/client-runtime-utils").Decimal;
        };
        withdrawals: {
            total: number;
            pending: number;
            totalPaidOut: number | import("@prisma/client-runtime-utils").Decimal;
        };
        balance: {
            totalUserBalance: number | import("@prisma/client-runtime-utils").Decimal;
        };
    }>;
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
    getSettings(): Promise<{
        id: string;
        updatedAt: Date;
        description: string | null;
        key: string;
        value: string;
        updatedBy: string | null;
    }[]>;
    giveBonus(userId: string, amount: number, reason: string, adminId: string): Promise<{
        userName: any;
    }>;
}
