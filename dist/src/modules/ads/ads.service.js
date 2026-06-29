"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdsService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../database/prisma/prisma.service");
const ads_provider_factory_1 = require("./providers/ads-provider.factory");
const client_1 = require("@prisma/client");
const cache_manager_1 = require("@nestjs/cache-manager");
let AdsService = class AdsService {
    constructor(prisma, cacheManager) {
        this.prisma = prisma;
        this.cacheManager = cacheManager;
    }
    async getSettings() {
        const cached = await this.cacheManager.get("app_settings");
        if (cached)
            return cached;
        const settings = await this.prisma.appSetting.findMany({
            where: {
                key: {
                    in: [
                        "daily_limit_basic",
                        "daily_limit_premium",
                        "reward_per_ad_basic",
                        "reward_per_ad_premium",
                    ],
                },
            },
        });
        const map = settings.reduce((acc, s) => ({ ...acc, [s.key]: s.value }), {});
        const result = {
            dailyLimitBasic: parseInt(map["daily_limit_basic"] ?? "5"),
            dailyLimitPremium: parseInt(map["daily_limit_premium"] ?? "50"),
            rewardPerAdBasic: parseFloat(map["reward_per_ad_basic"] ?? "0.50"),
            rewardPerAdPremium: parseFloat(map["reward_per_ad_premium"] ?? "1.00"),
        };
        await this.cacheManager.set("app_settings", result, 60 * 5 * 1000);
        return result;
    }
    async invalidateSettingsCache() {
        await this.cacheManager.del("app_settings");
    }
    async getAvailableAds(userId) {
        const user = await this.prisma.findUserFieldsOrThrow(userId, {
            subscriptionType: true,
        });
        const isPremium = user.subscriptionType === client_1.SubscriptionType.PREMIUM;
        const settings = await this.getSettings();
        const dailyLimit = isPremium
            ? settings.dailyLimitPremium
            : settings.dailyLimitBasic;
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        const todayLimit = await this.prisma.dailyAdLimit.findUnique({
            where: { userId_date: { userId, date: today } },
        });
        const watchedToday = todayLimit?.watchCount ?? 0;
        const remaining = Math.max(0, dailyLimit - watchedToday);
        if (remaining === 0) {
            return {
                ads: [],
                dailyLimit,
                watchedToday,
                remaining: 0,
                rewardPerAd: isPremium
                    ? settings.rewardPerAdPremium
                    : settings.rewardPerAdBasic,
                subscriptionType: user.subscriptionType,
            };
        }
        const totalAds = await this.prisma.ad.count({
            where: {
                isActive: true,
                ...(isPremium ? { targetPremium: true } : { targetBasic: true }),
            },
        });
        if (totalAds === 0) {
            return {
                ads: [],
                dailyLimit,
                watchedToday,
                remaining,
                rewardPerAd: isPremium
                    ? settings.rewardPerAdPremium
                    : settings.rewardPerAdBasic,
                subscriptionType: user.subscriptionType,
            };
        }
        const skipCount = watchedToday % totalAds;
        const batchSize = Math.min(remaining, 5);
        let ads;
        if (skipCount + batchSize <= totalAds) {
            ads = await this.prisma.ad.findMany({
                where: {
                    isActive: true,
                    ...(isPremium ? { targetPremium: true } : { targetBasic: true }),
                },
                orderBy: { priority: "desc" },
                skip: skipCount,
                take: batchSize,
                select: {
                    id: true,
                    title: true,
                    description: true,
                    adNetwork: true,
                    adType: true,
                    adUnitId: true,
                    rewardAmount: true,
                    durationSeconds: true,
                },
            });
        }
        else {
            const firstPart = await this.prisma.ad.findMany({
                where: {
                    isActive: true,
                    ...(isPremium ? { targetPremium: true } : { targetBasic: true }),
                },
                orderBy: { priority: "desc" },
                skip: skipCount,
                take: totalAds - skipCount,
                select: {
                    id: true,
                    title: true,
                    description: true,
                    adNetwork: true,
                    adType: true,
                    adUnitId: true,
                    rewardAmount: true,
                    durationSeconds: true,
                },
            });
            const secondPart = await this.prisma.ad.findMany({
                where: {
                    isActive: true,
                    ...(isPremium ? { targetPremium: true } : { targetBasic: true }),
                },
                orderBy: { priority: "desc" },
                skip: 0,
                take: batchSize - firstPart.length,
                select: {
                    id: true,
                    title: true,
                    description: true,
                    adNetwork: true,
                    adType: true,
                    adUnitId: true,
                    rewardAmount: true,
                    durationSeconds: true,
                },
            });
            ads = [...firstPart, ...secondPart];
        }
        return {
            ads,
            dailyLimit,
            watchedToday,
            remaining,
            rewardPerAd: isPremium
                ? settings.rewardPerAdPremium
                : settings.rewardPerAdBasic,
            subscriptionType: user.subscriptionType,
        };
    }
    async watchAd(userId, dto, ipAddress) {
        const user = await this.prisma.findUserFieldsOrThrow(userId, {
            id: true,
            subscriptionType: true,
            balance: true,
            isActive: true,
            isBanned: true,
        });
        if (!user.isActive || user.isBanned)
            throw new common_1.ForbiddenException("Account is not active");
        const ad = await this.prisma.ad.findUnique({
            where: { id: dto.adId, isActive: true },
        });
        if (!ad)
            throw new common_1.NotFoundException("Ad not found");
        const isPremium = user.subscriptionType === client_1.SubscriptionType.PREMIUM;
        if (!isPremium && !ad.targetBasic)
            throw new common_1.ForbiddenException("Upgrade to Premium to watch this ad");
        if (isPremium && !ad.targetPremium)
            throw new common_1.ForbiddenException("This ad is not available");
        const settings = await this.getSettings();
        const dailyLimit = isPremium
            ? settings.dailyLimitPremium
            : settings.dailyLimitBasic;
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        const todayRecord = await this.prisma.dailyAdLimit.findUnique({
            where: { userId_date: { userId, date: today } },
        });
        const watchedToday = todayRecord?.watchCount ?? 0;
        if (watchedToday >= dailyLimit) {
            throw new common_1.BadRequestException(`Daily limit reached. You can watch ${dailyLimit} ads per day.`);
        }
        const provider = ads_provider_factory_1.AdsProviderFactory.getProvider(dto.adNetwork);
        const isVerified = await provider.verifyWatch(dto.verificationToken);
        if (!isVerified) {
            throw new common_1.BadRequestException("Ad verification failed");
        }
        const rewardAmount = isPremium
            ? settings.rewardPerAdPremium
            : settings.rewardPerAdBasic;
        const currentBalance = Number(user.balance);
        const newBalance = currentBalance + rewardAmount;
        await this.prisma.$transaction([
            this.prisma.adWatch.create({
                data: {
                    userId,
                    adId: dto.adId,
                    rewardEarned: rewardAmount,
                    adNetwork: dto.adNetwork,
                    ipAddress,
                    deviceId: dto.deviceId,
                },
            }),
            this.prisma.user.update({
                where: { id: userId },
                data: {
                    balance: newBalance,
                    totalEarned: { increment: rewardAmount },
                },
            }),
            this.prisma.dailyAdLimit.upsert({
                where: { userId_date: { userId, date: today } },
                create: {
                    userId,
                    date: today,
                    watchCount: 1,
                    earned: rewardAmount,
                },
                update: {
                    watchCount: { increment: 1 },
                    earned: { increment: rewardAmount },
                },
            }),
            this.prisma.transaction.create({
                data: {
                    userId,
                    type: client_1.TransactionType.AD_REWARD,
                    status: client_1.TransactionStatus.COMPLETED,
                    amount: rewardAmount,
                    balanceBefore: currentBalance,
                    balanceAfter: newBalance,
                    description: `Ad reward: ${ad.title}`,
                    referenceId: dto.adId,
                },
            }),
        ]);
        return {
            rewardEarned: rewardAmount,
            newBalance,
            watchedToday: watchedToday + 1,
            remaining: dailyLimit - (watchedToday + 1),
        };
    }
    async getDailyStats(userId) {
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        const user = await this.prisma.findUserFieldsOrThrow(userId, {
            subscriptionType: true,
            balance: true,
        });
        const isPremium = user.subscriptionType === client_1.SubscriptionType.PREMIUM;
        const settings = await this.getSettings();
        const dailyLimit = isPremium
            ? settings.dailyLimitPremium
            : settings.dailyLimitBasic;
        const todayRecord = await this.prisma.dailyAdLimit.findUnique({
            where: { userId_date: { userId, date: today } },
        });
        return {
            watchedToday: todayRecord?.watchCount ?? 0,
            earnedToday: todayRecord?.earned ?? 0,
            dailyLimit,
            remaining: Math.max(0, dailyLimit - (todayRecord?.watchCount ?? 0)),
            rewardPerAd: isPremium
                ? settings.rewardPerAdPremium
                : settings.rewardPerAdBasic,
            balance: user.balance,
        };
    }
    async getWatchHistory(userId, page = 1, limit = 20) {
        const skip = (page - 1) * limit;
        const [history, total] = await this.prisma.$transaction([
            this.prisma.adWatch.findMany({
                where: { userId },
                orderBy: { watchedAt: "desc" },
                skip,
                take: limit,
                select: {
                    id: true,
                    rewardEarned: true,
                    adNetwork: true,
                    watchedAt: true,
                    ad: { select: { title: true, adType: true } },
                },
            }),
            this.prisma.adWatch.count({ where: { userId } }),
        ]);
        return {
            history,
            meta: { page, limit, total },
        };
    }
    async createAd(dto, createdBy) {
        return this.prisma.ad.create({
            data: {
                ...dto,
                createdBy,
                rewardAmount: dto.rewardAmount,
            },
        });
    }
    async getAllAds() {
        return this.prisma.ad.findMany({
            orderBy: { createdAt: "desc" },
        });
    }
    async toggleAdStatus(id) {
        const ad = await this.prisma.ad.findUnique({ where: { id } });
        if (!ad)
            throw new common_1.NotFoundException("Ad not found");
        return this.prisma.ad.update({
            where: { id },
            data: { isActive: !ad.isActive },
        });
    }
    async deleteAd(id) {
        const ad = await this.prisma.ad.findUnique({ where: { id } });
        if (!ad)
            throw new common_1.NotFoundException("Ad not found");
        await this.prisma.ad.delete({ where: { id } });
        return { message: "Ad deleted successfully" };
    }
};
exports.AdsService = AdsService;
exports.AdsService = AdsService = __decorate([
    (0, common_1.Injectable)(),
    __param(1, (0, common_1.Inject)(cache_manager_1.CACHE_MANAGER)),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService, Object])
], AdsService);
//# sourceMappingURL=ads.service.js.map