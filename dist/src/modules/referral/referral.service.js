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
exports.ReferralService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../database/prisma/prisma.service");
const client_1 = require("@prisma/client");
const config_1 = require("../../config");
const app_messages_1 = require("../../common/AppMessages/app.messages");
const notification_service_1 = require("../notification/notification.service");
let ReferralService = class ReferralService {
    constructor(prisma, notificationService) {
        this.prisma = prisma;
        this.notificationService = notificationService;
    }
    async applyReferral(referredUserId, referralCodeInput) {
        const cleanCode = referralCodeInput.toUpperCase().replace(/^TN-/, "");
        const referralCode = `TN-${cleanCode}`;
        const referrer = await this.prisma.user.findUnique({
            where: { referralCode },
            select: { id: true, balance: true, name: true },
        });
        if (!referrer)
            throw new common_1.NotFoundException(app_messages_1.AppMessages.referral.invalidCode);
        if (referrer.id === referredUserId)
            throw new common_1.BadRequestException(app_messages_1.AppMessages.referral.selfReferral);
        const existingReferral = await this.prisma.referral.findUnique({
            where: { referredUserId },
        });
        if (existingReferral)
            throw new common_1.ConflictException(app_messages_1.AppMessages.referral.alreadyApplied);
        const bonusAmount = config_1.configs.reward.referralBonus;
        const currentBalance = Number(referrer.balance);
        const newBalance = currentBalance + bonusAmount;
        await this.prisma.$transaction(async (tx) => {
            const referral = await tx.referral.create({
                data: {
                    referredById: referrer.id,
                    referredUserId,
                    bonusAmount,
                    isPaid: true,
                },
            });
            await tx.user.update({
                where: { id: referrer.id },
                data: {
                    balance: { increment: bonusAmount },
                    totalEarned: { increment: bonusAmount },
                },
            });
            await tx.transaction.create({
                data: {
                    userId: referrer.id,
                    type: client_1.TransactionType.BONUS,
                    status: client_1.TransactionStatus.COMPLETED,
                    amount: bonusAmount,
                    balanceBefore: currentBalance,
                    balanceAfter: newBalance,
                    description: `রেফারেল বোনাস — নতুন ব্যবহারকারী আনার জন্য`,
                    referenceId: referral.id,
                },
            });
        });
        await this.notificationService.createAndSend(referrer.id, client_1.NotificationType.BONUS, "রেফারেল বোনাস পেয়েছেন! 🎉", `৳${bonusAmount} বোনাস আপনার অ্যাকাউন্টে যোগ হয়েছে!`, { type: "BONUS" });
    }
};
exports.ReferralService = ReferralService;
exports.ReferralService = ReferralService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        notification_service_1.NotificationService])
], ReferralService);
//# sourceMappingURL=referral.service.js.map