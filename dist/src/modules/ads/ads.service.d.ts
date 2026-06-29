import { PrismaService } from "@/database/prisma/prisma.service";
import { CreateAdDto } from "./dto/create-ad.dto";
import { WatchAdDto } from "./dto/watch-ad.dto";
import { Cache } from "cache-manager";
export declare class AdsService {
    private readonly prisma;
    private cacheManager;
    constructor(prisma: PrismaService, cacheManager: Cache);
    private getSettings;
    invalidateSettingsCache(): Promise<void>;
    getAvailableAds(userId: string): Promise<{
        ads: any;
        dailyLimit: number;
        watchedToday: number;
        remaining: number;
        rewardPerAd: number;
        subscriptionType: import(".prisma/client").$Enums.SubscriptionType;
    }>;
    watchAd(userId: string, dto: WatchAdDto, ipAddress?: string): Promise<{
        rewardEarned: number;
        newBalance: number;
        watchedToday: number;
        remaining: number;
    }>;
    getDailyStats(userId: string): Promise<{
        watchedToday: number;
        earnedToday: number | import("@prisma/client-runtime-utils").Decimal;
        dailyLimit: number;
        remaining: number;
        rewardPerAd: number;
        balance: import("@prisma/client-runtime-utils").Decimal;
    }>;
    getWatchHistory(userId: string, page?: number, limit?: number): Promise<{
        history: {
            id: string;
            adNetwork: import(".prisma/client").$Enums.AdNetwork;
            ad: {
                title: string;
                adType: import(".prisma/client").$Enums.AdType;
            };
            rewardEarned: import("@prisma/client-runtime-utils").Decimal;
            watchedAt: Date;
        }[];
        meta: {
            page: number;
            limit: number;
            total: number;
        };
    }>;
    createAd(dto: CreateAdDto, createdBy: string): Promise<{
        adUnitId: string | null;
        id: string;
        title: string;
        description: string | null;
        adNetwork: import(".prisma/client").$Enums.AdNetwork;
        adType: import(".prisma/client").$Enums.AdType;
        rewardAmount: import("@prisma/client-runtime-utils").Decimal;
        durationSeconds: number;
        isActive: boolean;
        targetBasic: boolean;
        targetPremium: boolean;
        priority: number;
        createdBy: string;
        createdAt: Date;
        updatedAt: Date;
    }>;
    getAllAds(): Promise<{
        adUnitId: string | null;
        id: string;
        title: string;
        description: string | null;
        adNetwork: import(".prisma/client").$Enums.AdNetwork;
        adType: import(".prisma/client").$Enums.AdType;
        rewardAmount: import("@prisma/client-runtime-utils").Decimal;
        durationSeconds: number;
        isActive: boolean;
        targetBasic: boolean;
        targetPremium: boolean;
        priority: number;
        createdBy: string;
        createdAt: Date;
        updatedAt: Date;
    }[]>;
    toggleAdStatus(id: string): Promise<{
        adUnitId: string | null;
        id: string;
        title: string;
        description: string | null;
        adNetwork: import(".prisma/client").$Enums.AdNetwork;
        adType: import(".prisma/client").$Enums.AdType;
        rewardAmount: import("@prisma/client-runtime-utils").Decimal;
        durationSeconds: number;
        isActive: boolean;
        targetBasic: boolean;
        targetPremium: boolean;
        priority: number;
        createdBy: string;
        createdAt: Date;
        updatedAt: Date;
    }>;
    deleteAd(id: string): Promise<{
        message: string;
    }>;
}
