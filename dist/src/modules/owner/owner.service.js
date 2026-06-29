"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OwnerService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../database/prisma/prisma.service");
const client_1 = require("@prisma/client");
const bcrypt = __importStar(require("bcrypt"));
const cache_manager_1 = require("@nestjs/cache-manager");
const app_messages_1 = require("../../common/AppMessages/app.messages");
let OwnerService = class OwnerService {
    constructor(prisma, cacheManager) {
        this.prisma = prisma;
        this.cacheManager = cacheManager;
    }
    async getOverview() {
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        const thisMonth = new Date();
        thisMonth.setDate(1);
        thisMonth.setHours(0, 0, 0, 0);
        const [totalUsers, activeUsers, bannedUsers, premiumUsers, basicUsers, totalAdmins, pendingWithdrawals, approvedWithdrawals, totalAdsWatched, todayAdsWatched, todayRegistrations, monthRegistrations,] = await this.prisma.$transaction([
            this.prisma.user.count({ where: { role: client_1.Role.USER } }),
            this.prisma.user.count({
                where: { role: client_1.Role.USER, isActive: true, isBanned: false },
            }),
            this.prisma.user.count({ where: { role: client_1.Role.USER, isBanned: true } }),
            this.prisma.user.count({
                where: { role: client_1.Role.USER, subscriptionType: client_1.SubscriptionType.PREMIUM },
            }),
            this.prisma.user.count({
                where: { role: client_1.Role.USER, subscriptionType: client_1.SubscriptionType.BASIC },
            }),
            this.prisma.user.count({ where: { role: client_1.Role.ADMIN } }),
            this.prisma.withdrawal.count({
                where: { status: client_1.WithdrawalStatus.PENDING },
            }),
            this.prisma.withdrawal.count({
                where: { status: client_1.WithdrawalStatus.APPROVED },
            }),
            this.prisma.adWatch.count(),
            this.prisma.adWatch.count({ where: { watchedAt: { gte: today } } }),
            this.prisma.user.count({ where: { createdAt: { gte: today } } }),
            this.prisma.user.count({ where: { createdAt: { gte: thisMonth } } }),
        ]);
        const [totalPaidOut, totalUserBalance, todayEarnings, monthEarnings] = await Promise.all([
            this.prisma.withdrawal.aggregate({
                where: { status: client_1.WithdrawalStatus.APPROVED },
                _sum: { amount: true },
            }),
            this.prisma.user.aggregate({
                where: { role: client_1.Role.USER },
                _sum: { balance: true, totalEarned: true },
            }),
            this.prisma.dailyAdLimit.aggregate({
                where: { date: today },
                _sum: { earned: true },
            }),
            this.prisma.dailyAdLimit.aggregate({
                where: { date: { gte: thisMonth } },
                _sum: { earned: true },
            }),
        ]);
        return {
            users: {
                total: totalUsers,
                active: activeUsers,
                banned: bannedUsers,
                premium: premiumUsers,
                basic: basicUsers,
                admins: totalAdmins,
                todayNew: todayRegistrations,
                monthNew: monthRegistrations,
            },
            ads: {
                totalWatched: totalAdsWatched,
                todayWatched: todayAdsWatched,
                todayEarnings: todayEarnings._sum.earned ?? 0,
                monthEarnings: monthEarnings._sum.earned ?? 0,
            },
            finance: {
                totalPaidOut: totalPaidOut._sum.amount ?? 0,
                totalUserBalance: totalUserBalance._sum.balance ?? 0,
                totalEarned: totalUserBalance._sum.totalEarned ?? 0,
                pendingWithdrawals,
                approvedWithdrawals,
            },
        };
    }
    async createAdmin(data) {
        const existingPhone = await this.prisma.findUserByPhone(data.phone);
        if (existingPhone)
            throw new common_1.ConflictException(app_messages_1.AppMessages.admin.phoneExists);
        const passwordHash = await bcrypt.hash(data.password, 10);
        return this.prisma.user.create({
            data: {
                name: data.name,
                phone: data.phone,
                email: data.email,
                passwordHash,
                role: client_1.Role.ADMIN,
                isActive: true,
            },
            select: {
                id: true,
                name: true,
                phone: true,
                email: true,
                role: true,
                createdAt: true,
            },
        });
    }
    async getAdmins() {
        return this.prisma.user.findMany({
            where: { role: client_1.Role.ADMIN },
            select: {
                id: true,
                name: true,
                phone: true,
                email: true,
                isActive: true,
                createdAt: true,
                lastLoginAt: true,
            },
            orderBy: { createdAt: "desc" },
        });
    }
    async toggleAdminStatus(adminId) {
        const admin = await this.prisma.user.findUnique({
            where: { id: adminId, role: client_1.Role.ADMIN },
        });
        if (!admin)
            throw new common_1.NotFoundException(app_messages_1.AppMessages.admin.notFound);
        return this.prisma.user.update({
            where: { id: adminId },
            data: { isActive: !admin.isActive },
            select: { id: true, isActive: true },
        });
    }
    async deleteAdmin(adminId) {
        const admin = await this.prisma.user.findUnique({
            where: { id: adminId, role: client_1.Role.ADMIN },
        });
        if (!admin)
            throw new common_1.NotFoundException(app_messages_1.AppMessages.admin.notFound);
        await this.prisma.user.delete({ where: { id: adminId } });
    }
    async getSettings() {
        const settings = await this.prisma.appSetting.findMany({
            orderBy: { key: "asc" },
        });
        return settings.reduce((acc, s) => ({ ...acc, [s.key]: s.value }), {});
    }
    async updateSetting(key, value, ownerId) {
        const result = await this.prisma.appSetting.upsert({
            where: { key },
            update: { value, updatedBy: ownerId },
            create: { key, value, updatedBy: ownerId },
        });
        await this.cacheManager.del("app_settings");
        return result;
    }
    async updateMultipleSettings(settings, ownerId) {
        const updates = Object.entries(settings).map(([key, value]) => this.prisma.appSetting.upsert({
            where: { key },
            update: { value, updatedBy: ownerId },
            create: { key, value, updatedBy: ownerId },
        }));
        await this.prisma.$transaction(updates);
        await this.cacheManager.del("app_settings");
    }
    async getRevenueRecords(days = 30) {
        const from = new Date();
        from.setDate(from.getDate() - days);
        return this.prisma.revenueRecord.findMany({
            where: { date: { gte: from } },
            orderBy: { date: "desc" },
        });
    }
    async upsertRevenueRecord(date, data) {
        const totalRevenue = (data.admobRevenue ?? 0) +
            (data.adsenseRevenue ?? 0) +
            (data.unityRevenue ?? 0) +
            (data.otherRevenue ?? 0);
        const profit = totalRevenue - (data.totalPaidOut ?? 0);
        return this.prisma.revenueRecord.upsert({
            where: { date },
            update: { ...data, totalRevenue, profit, updatedAt: new Date() },
            create: { date, ...data, totalRevenue, profit },
        });
    }
    async giveBonus(userId, amount, reason, ownerId) {
        const user = await this.prisma.findUserByIdOrThrow(userId);
        const currentBalance = Number(user.balance);
        const newBalance = currentBalance + amount;
        await this.prisma.$transaction([
            this.prisma.bonus.create({
                data: {
                    userId,
                    amount,
                    reason,
                    isApplied: true,
                    appliedAt: new Date(),
                    createdBy: ownerId,
                },
            }),
            this.prisma.user.update({
                where: { id: userId },
                data: { balance: newBalance, totalEarned: { increment: amount } },
            }),
            this.prisma.transaction.create({
                data: {
                    userId,
                    type: "BONUS",
                    status: "COMPLETED",
                    amount,
                    balanceBefore: currentBalance,
                    balanceAfter: newBalance,
                    description: `Owner bonus: ${reason}`,
                },
            }),
            this.prisma.notification.create({
                data: {
                    userId,
                    type: "BONUS",
                    title: "বোনাস পেয়েছেন! 🎉",
                    body: `আপনি ৳${amount} বোনাস পেয়েছেন। কারণ: ${reason}`,
                },
            }),
        ]);
        return { userName: user.name };
    }
    async setMaintenanceMode(enabled, ownerId) {
        await this.prisma.appSetting.upsert({
            where: { key: "maintenance_mode" },
            update: { value: enabled.toString(), updatedBy: ownerId },
            create: {
                key: "maintenance_mode",
                value: enabled.toString(),
                updatedBy: ownerId,
            },
        });
        return { maintenanceMode: enabled };
    }
    async setForceUpdate(enabled, version, ownerId) {
        await this.prisma.$transaction([
            this.prisma.appSetting.upsert({
                where: { key: "force_update" },
                update: { value: enabled.toString(), updatedBy: ownerId },
                create: {
                    key: "force_update",
                    value: enabled.toString(),
                    updatedBy: ownerId,
                },
            }),
            this.prisma.appSetting.upsert({
                where: { key: "app_version" },
                update: { value: version, updatedBy: ownerId },
                create: { key: "app_version", value: version, updatedBy: ownerId },
            }),
        ]);
        return { forceUpdate: enabled, version };
    }
};
exports.OwnerService = OwnerService;
exports.OwnerService = OwnerService = __decorate([
    (0, common_1.Injectable)(),
    __param(1, (0, common_1.Inject)(cache_manager_1.CACHE_MANAGER)),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService, Object])
], OwnerService);
//# sourceMappingURL=owner.service.js.map