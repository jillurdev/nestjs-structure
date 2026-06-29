import { PrismaService } from "@/database/prisma/prisma.service";
import { NotificationService } from "../notification/notification.service";
export declare class SubscriptionService {
    private readonly prisma;
    private readonly notificationService;
    constructor(prisma: PrismaService, notificationService: NotificationService);
    getPlans(): Promise<{
        id: string;
        isActive: boolean;
        createdAt: Date;
        updatedAt: Date;
        name: string;
        type: import(".prisma/client").$Enums.SubscriptionType;
        price: import("@prisma/client-runtime-utils").Decimal;
        durationDays: number;
        dailyAdLimit: number;
        rewardPerAd: import("@prisma/client-runtime-utils").Decimal;
        minWithdrawal: import("@prisma/client-runtime-utils").Decimal;
        features: string[];
    }[]>;
    getStatus(userId: string): Promise<{
        currentPlan: import(".prisma/client").$Enums.SubscriptionType;
        subscription: ({
            plan: {
                id: string;
                isActive: boolean;
                createdAt: Date;
                updatedAt: Date;
                name: string;
                type: import(".prisma/client").$Enums.SubscriptionType;
                price: import("@prisma/client-runtime-utils").Decimal;
                durationDays: number;
                dailyAdLimit: number;
                rewardPerAd: import("@prisma/client-runtime-utils").Decimal;
                minWithdrawal: import("@prisma/client-runtime-utils").Decimal;
                features: string[];
            };
        } & {
            id: string;
            price: import("@prisma/client-runtime-utils").Decimal;
            userId: string;
            status: import(".prisma/client").$Enums.SubscriptionStatus;
            planId: string;
            startedAt: Date;
            expiresAt: Date;
            cancelledAt: Date | null;
        }) | null;
        isExpiringSoon: boolean;
    }>;
    upgradeToPremium(userId: string): Promise<{
        expiresAt: Date;
        newBalance: number;
    }>;
    checkExpiredSubscriptions(): Promise<{
        expired: number;
    }>;
    getAllSubscriptions(page?: number, limit?: number): Promise<{
        subscriptions: ({
            user: {
                id: string;
                name: string;
                phone: string;
            };
            plan: {
                name: string;
                price: import("@prisma/client-runtime-utils").Decimal;
            };
        } & {
            id: string;
            price: import("@prisma/client-runtime-utils").Decimal;
            userId: string;
            status: import(".prisma/client").$Enums.SubscriptionStatus;
            planId: string;
            startedAt: Date;
            expiresAt: Date;
            cancelledAt: Date | null;
        })[];
        meta: {
            page: number;
            limit: number;
            total: number;
        };
    }>;
}
