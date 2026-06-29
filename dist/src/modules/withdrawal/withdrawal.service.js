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
exports.WithdrawalService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../database/prisma/prisma.service");
const client_1 = require("@prisma/client");
const config_1 = require("../../config");
const notification_service_1 = require("../notification/notification.service");
const app_messages_1 = require("../../common/AppMessages/app.messages");
let WithdrawalService = class WithdrawalService {
    constructor(prisma, notificationService) {
        this.prisma = prisma;
        this.notificationService = notificationService;
    }
    async requestWithdrawal(userId, dto) {
        const user = await this.prisma.findUserFieldsOrThrow(userId, {
            id: true,
            balance: true,
            subscriptionType: true,
            isActive: true,
            isBanned: true,
        });
        if (!user.isActive || user.isBanned)
            throw new common_1.ForbiddenException("Account is not active");
        const isPremium = user.subscriptionType === client_1.SubscriptionType.PREMIUM;
        const minWithdrawal = isPremium
            ? config_1.configs.reward.minWithdrawalPremium
            : config_1.configs.reward.minWithdrawalBasic;
        const currentBalance = Number(user.balance);
        if (dto.amount < minWithdrawal) {
            throw new common_1.BadRequestException(`Minimum withdrawal amount is ৳${minWithdrawal}`);
        }
        if (dto.amount > currentBalance) {
            throw new common_1.BadRequestException("Insufficient balance");
        }
        const pendingWithdrawal = await this.prisma.withdrawal.findFirst({
            where: { userId, status: client_1.WithdrawalStatus.PENDING },
        });
        if (pendingWithdrawal) {
            throw new common_1.BadRequestException("You already have a pending withdrawal request");
        }
        const newBalance = currentBalance - dto.amount;
        const withdrawal = await this.prisma.$transaction(async (tx) => {
            const withdrawal = await tx.withdrawal.create({
                data: {
                    userId,
                    amount: dto.amount,
                    method: dto.method,
                    accountNumber: dto.accountNumber,
                    accountName: dto.accountName,
                    status: client_1.WithdrawalStatus.PENDING,
                },
            });
            await tx.user.update({
                where: { id: userId },
                data: { balance: newBalance },
            });
            await tx.transaction.create({
                data: {
                    userId,
                    type: client_1.TransactionType.WITHDRAWAL,
                    status: client_1.TransactionStatus.PENDING,
                    amount: dto.amount,
                    balanceBefore: currentBalance,
                    balanceAfter: newBalance,
                    description: `Withdrawal via ${dto.method} to ${dto.accountNumber}`,
                    referenceId: withdrawal.id,
                },
            });
            return withdrawal;
        });
        return withdrawal;
    }
    async getUserWithdrawals(userId, page = 1, limit = 10) {
        const skip = (page - 1) * limit;
        const [withdrawals, total] = await this.prisma.$transaction([
            this.prisma.withdrawal.findMany({
                where: { userId },
                orderBy: { requestedAt: "desc" },
                skip,
                take: limit,
            }),
            this.prisma.withdrawal.count({ where: { userId } }),
        ]);
        return {
            withdrawals,
            meta: { page, limit, total },
        };
    }
    async getAllWithdrawals(status, page = 1, limit = 20) {
        const skip = (page - 1) * limit;
        const where = status ? { status } : {};
        const [withdrawals, total] = await this.prisma.$transaction([
            this.prisma.withdrawal.findMany({
                where,
                orderBy: { requestedAt: "desc" },
                skip,
                take: limit,
                include: {
                    user: {
                        select: {
                            id: true,
                            name: true,
                            phone: true,
                            subscriptionType: true,
                        },
                    },
                },
            }),
            this.prisma.withdrawal.count({ where }),
        ]);
        return {
            withdrawals,
            meta: { page, limit, total },
        };
    }
    async approveWithdrawal(id, adminId, note) {
        const withdrawal = await this.prisma.withdrawal.findUnique({
            where: { id },
            include: { user: true },
        });
        if (!withdrawal)
            throw new common_1.NotFoundException("Withdrawal not found");
        if (withdrawal.status !== client_1.WithdrawalStatus.PENDING) {
            throw new common_1.BadRequestException("Withdrawal is not pending");
        }
        await this.prisma.$transaction([
            this.prisma.withdrawal.update({
                where: { id },
                data: {
                    status: client_1.WithdrawalStatus.APPROVED,
                    adminNote: note,
                    processedBy: adminId,
                    processedAt: new Date(),
                },
            }),
            this.prisma.user.update({
                where: { id: withdrawal.userId },
                data: {
                    totalWithdrawn: { increment: Number(withdrawal.amount) },
                },
            }),
            this.prisma.transaction.updateMany({
                where: { referenceId: id },
                data: { status: client_1.TransactionStatus.COMPLETED },
            }),
        ]);
        await this.notificationService.createAndSend(withdrawal.userId, client_1.NotificationType.WITHDRAWAL_APPROVED, "উত্তোলন অনুমোদিত হয়েছে ✅", `আপনার ৳${withdrawal.amount} উত্তোলন অনুমোদিত হয়েছে।`, { type: "WITHDRAWAL_APPROVED", withdrawalId: id });
        return { message: app_messages_1.AppMessages.withdrawal.approved };
    }
    async rejectWithdrawal(id, adminId, note) {
        const withdrawal = await this.prisma.withdrawal.findUnique({
            where: { id },
            include: { user: true },
        });
        if (!withdrawal)
            throw new common_1.NotFoundException("Withdrawal not found");
        if (withdrawal.status !== client_1.WithdrawalStatus.PENDING) {
            throw new common_1.BadRequestException("Withdrawal is not pending");
        }
        const currentBalance = Number(withdrawal.user.balance);
        const refundedBalance = currentBalance + Number(withdrawal.amount);
        await this.prisma.$transaction([
            this.prisma.withdrawal.update({
                where: { id },
                data: {
                    status: client_1.WithdrawalStatus.REJECTED,
                    adminNote: note,
                    processedBy: adminId,
                    processedAt: new Date(),
                },
            }),
            this.prisma.user.update({
                where: { id: withdrawal.userId },
                data: { balance: refundedBalance },
            }),
            this.prisma.transaction.create({
                data: {
                    userId: withdrawal.userId,
                    type: client_1.TransactionType.REFUND,
                    status: client_1.TransactionStatus.COMPLETED,
                    amount: Number(withdrawal.amount),
                    balanceBefore: currentBalance,
                    balanceAfter: refundedBalance,
                    description: `Withdrawal rejected: ${note}`,
                    referenceId: id,
                },
            }),
            this.prisma.transaction.updateMany({
                where: {
                    userId: withdrawal.userId,
                    type: client_1.TransactionType.WITHDRAWAL,
                    status: client_1.TransactionStatus.PENDING,
                    amount: withdrawal.amount,
                },
                data: { status: client_1.TransactionStatus.FAILED },
            }),
        ]);
        await this.notificationService.createAndSend(withdrawal.userId, client_1.NotificationType.WITHDRAWAL_REJECTED, "উত্তোলন বাতিল হয়েছে ❌", `আপনার ৳${withdrawal.amount} উত্তোলন বাতিল হয়েছে। কারণ: ${note}`, { type: "WITHDRAWAL_REJECTED", withdrawalId: id });
        return { message: app_messages_1.AppMessages.withdrawal.rejected };
    }
    async getWalletSummary(userId) {
        const user = await this.prisma.user.findUnique({
            where: { id: userId },
            select: {
                balance: true,
                totalEarned: true,
                totalWithdrawn: true,
                subscriptionType: true,
            },
        });
        if (!user)
            throw new common_1.NotFoundException("User not found");
        const isPremium = user.subscriptionType === client_1.SubscriptionType.PREMIUM;
        const recentTransactions = await this.prisma.transaction.findMany({
            where: { userId },
            orderBy: { createdAt: "desc" },
            take: 10,
        });
        return {
            balance: user.balance,
            totalEarned: user.totalEarned,
            totalWithdrawn: user.totalWithdrawn,
            minWithdrawal: isPremium
                ? config_1.configs.reward.minWithdrawalPremium
                : config_1.configs.reward.minWithdrawalBasic,
            recentTransactions,
        };
    }
};
exports.WithdrawalService = WithdrawalService;
exports.WithdrawalService = WithdrawalService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        notification_service_1.NotificationService])
], WithdrawalService);
//# sourceMappingURL=withdrawal.service.js.map