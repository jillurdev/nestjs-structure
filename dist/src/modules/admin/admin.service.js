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
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdminService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../database/prisma/prisma.service");
const client_1 = require("@prisma/client");
const notification_service_1 = require("../notification/notification.service");
let AdminService = class AdminService {
    constructor(prisma, notificationService) {
        this.prisma = prisma;
        this.notificationService = notificationService;
    }
    async getDashboardStats() {
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        const [totalUsers, activeUsers, premiumUsers, totalWithdrawals, pendingWithdrawals, todayRegistrations, todayAdWatches, todayEarnings, totalAdsWatched,] = await this.prisma.$transaction([
            this.prisma.user.count({ where: { role: client_1.Role.USER } }),
            this.prisma.user.count({ where: { role: client_1.Role.USER, isActive: true } }),
            this.prisma.user.count({ where: { subscriptionType: "PREMIUM" } }),
            this.prisma.withdrawal.count(),
            this.prisma.withdrawal.count({
                where: { status: client_1.WithdrawalStatus.PENDING },
            }),
            this.prisma.user.count({ where: { createdAt: { gte: today } } }),
            this.prisma.adWatch.count({ where: { watchedAt: { gte: today } } }),
            this.prisma.dailyAdLimit.aggregate({
                where: { date: today },
                _sum: { earned: true },
            }),
            this.prisma.adWatch.count(),
        ]);
        const totalPaidOut = await this.prisma.withdrawal.aggregate({
            where: { status: client_1.WithdrawalStatus.APPROVED },
            _sum: { amount: true },
        });
        const totalBalance = await this.prisma.user.aggregate({
            _sum: { balance: true },
        });
        return {
            users: {
                total: totalUsers,
                active: activeUsers,
                premium: premiumUsers,
                todayNew: todayRegistrations,
            },
            ads: {
                totalWatched: totalAdsWatched,
                todayWatched: todayAdWatches,
                todayEarnings: todayEarnings._sum.earned ?? 0,
            },
            withdrawals: {
                total: totalWithdrawals,
                pending: pendingWithdrawals,
                totalPaidOut: totalPaidOut._sum.amount ?? 0,
            },
            balance: {
                totalUserBalance: totalBalance._sum.balance ?? 0,
            },
        };
    }
    async getRevenueRecords(days = 30) {
        const from = new Date();
        from.setDate(from.getDate() - days);
        return this.prisma.revenueRecord.findMany({
            where: { date: { gte: from } },
            orderBy: { date: "desc" },
        });
    }
    async getSettings() {
        return this.prisma.appSetting.findMany({
            orderBy: { key: "asc" },
        });
    }
    async giveBonus(userId, amount, reason, adminId) {
        const user = await this.prisma.findUserFieldsOrThrow(userId, {
            balance: true,
            name: true,
        });
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
                    createdBy: adminId,
                },
            }),
            this.prisma.user.update({
                where: { id: userId },
                data: {
                    balance: newBalance,
                    totalEarned: { increment: amount },
                },
            }),
            this.prisma.transaction.create({
                data: {
                    userId,
                    type: "BONUS",
                    status: "COMPLETED",
                    amount,
                    balanceBefore: currentBalance,
                    balanceAfter: newBalance,
                    description: `Bonus: ${reason}`,
                },
            }),
        ]);
        await this.notificationService.createAndSend(userId, client_1.NotificationType.BONUS, "বোনাস পেয়েছেন! 🎉", `আপনার অ্যাকাউন্টে ৳${amount} বোনাস যোগ হয়েছে। কারণ: ${reason}`, { type: "BONUS" });
        return { userName: user.name };
    }
};
exports.AdminService = AdminService;
exports.AdminService = AdminService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        notification_service_1.NotificationService])
], AdminService);
//# sourceMappingURL=admin.service.js.map