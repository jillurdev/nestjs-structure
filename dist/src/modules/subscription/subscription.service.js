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
exports.SubscriptionService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../database/prisma/prisma.service");
const client_1 = require("@prisma/client");
const app_messages_1 = require("../../common/AppMessages/app.messages");
const notification_service_1 = require("../notification/notification.service");
let SubscriptionService = class SubscriptionService {
    constructor(prisma, notificationService) {
        this.prisma = prisma;
        this.notificationService = notificationService;
    }
    async getPlans() {
        return this.prisma.subscriptionPlan.findMany({
            where: { isActive: true },
            orderBy: { price: "asc" },
        });
    }
    async getStatus(userId) {
        const user = await this.prisma.findUserFieldsOrThrow(userId, {
            subscriptionType: true,
        });
        const activeSub = await this.prisma.subscription.findFirst({
            where: { userId, status: client_1.SubscriptionStatus.ACTIVE },
            orderBy: { startedAt: "desc" },
            include: { plan: true },
        });
        const THREE_DAYS = 3 * 24 * 60 * 60 * 1000;
        const timeLeft = activeSub
            ? new Date(activeSub.expiresAt).getTime() - Date.now()
            : null;
        return {
            currentPlan: user.subscriptionType,
            subscription: activeSub,
            isExpiringSoon: timeLeft !== null && timeLeft < THREE_DAYS,
        };
    }
    async upgradeToPremium(userId) {
        const user = await this.prisma.findUserFieldsOrThrow(userId, {
            balance: true,
            subscriptionType: true,
        });
        if (user.subscriptionType === client_1.SubscriptionType.PREMIUM)
            throw new common_1.BadRequestException(app_messages_1.AppMessages.subscription.alreadyPremium);
        const plan = await this.prisma.subscriptionPlan.findUnique({
            where: { type: client_1.SubscriptionType.PREMIUM },
        });
        if (!plan)
            throw new common_1.NotFoundException(app_messages_1.AppMessages.subscription.notFound);
        const currentBalance = Number(user.balance);
        const price = Number(plan.price);
        if (currentBalance < price)
            throw new common_1.BadRequestException(app_messages_1.AppMessages.subscription.insufficientBalance(price, currentBalance));
        const newBalance = currentBalance - price;
        const now = new Date();
        const expiresAt = new Date(now.getTime() + plan.durationDays * 24 * 60 * 60 * 1000);
        await this.prisma.$transaction([
            this.prisma.subscription.create({
                data: {
                    userId,
                    planId: plan.id,
                    status: client_1.SubscriptionStatus.ACTIVE,
                    price,
                    startedAt: now,
                    expiresAt,
                },
            }),
            this.prisma.user.update({
                where: { id: userId },
                data: {
                    subscriptionType: client_1.SubscriptionType.PREMIUM,
                    balance: newBalance,
                },
            }),
            this.prisma.transaction.create({
                data: {
                    userId,
                    type: client_1.TransactionType.SUBSCRIPTION_FEE,
                    status: client_1.TransactionStatus.COMPLETED,
                    amount: price,
                    balanceBefore: currentBalance,
                    balanceAfter: newBalance,
                    description: `প্রিমিয়াম সাবস্ক্রিপশন — ${plan.durationDays} দিন`,
                },
            }),
        ]);
        await this.notificationService.create(userId, client_1.NotificationType.SYSTEM, "প্রিমিয়াম সক্রিয় হয়েছে! 🎉", `আপনার প্রিমিয়াম সদস্যপদ সক্রিয় হয়েছে। মেয়াদ: ${plan.durationDays} দিন।`);
        await this.notificationService.sendPushToUser(userId, "প্রিমিয়াম সক্রিয় হয়েছে! 🎉", `${plan.durationDays} দিনের জন্য প্রিমিয়াম সক্রিয় হয়েছে।`, { type: "SUBSCRIPTION" });
        return { expiresAt, newBalance };
    }
    async checkExpiredSubscriptions() {
        const now = new Date();
        const expired = await this.prisma.subscription.findMany({
            where: {
                status: client_1.SubscriptionStatus.ACTIVE,
                expiresAt: { lt: now },
            },
            select: { id: true, userId: true },
        });
        for (const sub of expired) {
            await this.prisma.$transaction([
                this.prisma.subscription.update({
                    where: { id: sub.id },
                    data: { status: client_1.SubscriptionStatus.EXPIRED },
                }),
                this.prisma.user.update({
                    where: { id: sub.userId },
                    data: { subscriptionType: client_1.SubscriptionType.BASIC },
                }),
            ]);
            await this.notificationService.create(sub.userId, client_1.NotificationType.SUBSCRIPTION_EXPIRING, "প্রিমিয়াম মেয়াদ শেষ হয়েছে", "আপনার প্রিমিয়াম সদস্যপদের মেয়াদ শেষ হয়েছে। আবার আপগ্রেড করুন।");
            await this.notificationService.sendPushToUser(sub.userId, "প্রিমিয়াম মেয়াদ শেষ হয়েছে", "আবার আপগ্রেড করুন এবং বেশি আয় করুন!", { type: "SUBSCRIPTION_EXPIRED" });
        }
        return { expired: expired.length };
    }
    async getAllSubscriptions(page = 1, limit = 20) {
        const skip = (page - 1) * limit;
        const [subscriptions, total] = await this.prisma.$transaction([
            this.prisma.subscription.findMany({
                skip,
                take: limit,
                orderBy: { startedAt: "desc" },
                include: {
                    user: { select: { id: true, name: true, phone: true } },
                    plan: { select: { name: true, price: true } },
                },
            }),
            this.prisma.subscription.count(),
        ]);
        return { subscriptions, meta: { page, limit, total } };
    }
};
exports.SubscriptionService = SubscriptionService;
exports.SubscriptionService = SubscriptionService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        notification_service_1.NotificationService])
], SubscriptionService);
//# sourceMappingURL=subscription.service.js.map