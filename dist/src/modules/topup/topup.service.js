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
exports.TopupService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../database/prisma/prisma.service");
const client_1 = require("@prisma/client");
const app_messages_1 = require("../../common/AppMessages/app.messages");
const notification_service_1 = require("../notification/notification.service");
let TopupService = class TopupService {
    constructor(prisma, notificationService) {
        this.prisma = prisma;
        this.notificationService = notificationService;
    }
    async requestTopup(userId, dto) {
        const existing = await this.prisma.topupRequest.findFirst({
            where: { transactionId: dto.transactionId },
        });
        if (existing)
            throw new common_1.ConflictException(app_messages_1.AppMessages.topup.duplicateTransaction);
        const pending = await this.prisma.topupRequest.findFirst({
            where: { userId, status: client_1.TopupStatus.PENDING },
        });
        if (pending)
            throw new common_1.BadRequestException(app_messages_1.AppMessages.topup.pendingExists);
        return this.prisma.topupRequest.create({
            data: {
                userId,
                amount: dto.amount,
                method: dto.method,
                transactionId: dto.transactionId,
                senderNumber: dto.senderNumber,
                status: client_1.TopupStatus.PENDING,
            },
        });
    }
    async getUserTopups(userId, page = 1, limit = 10) {
        const skip = (page - 1) * limit;
        const [topups, total] = await this.prisma.$transaction([
            this.prisma.topupRequest.findMany({
                where: { userId },
                orderBy: { requestedAt: "desc" },
                skip,
                take: limit,
            }),
            this.prisma.topupRequest.count({ where: { userId } }),
        ]);
        return { topups, meta: { page, limit, total } };
    }
    async getAllTopups(status, page = 1, limit = 20) {
        const skip = (page - 1) * limit;
        const where = status ? { status } : {};
        const [topups, total] = await this.prisma.$transaction([
            this.prisma.topupRequest.findMany({
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
                        },
                    },
                },
            }),
            this.prisma.topupRequest.count({ where }),
        ]);
        return { topups, meta: { page, limit, total } };
    }
    async approveTopup(id, adminId, note) {
        const topup = await this.prisma.topupRequest.findUnique({
            where: { id },
            include: { user: { select: { balance: true } } },
        });
        if (!topup)
            throw new common_1.NotFoundException(app_messages_1.AppMessages.topup.notFound);
        if (topup.status !== client_1.TopupStatus.PENDING)
            throw new common_1.BadRequestException(app_messages_1.AppMessages.topup.alreadyProcessed);
        const currentBalance = Number(topup.user.balance);
        const amount = Number(topup.amount);
        const newBalance = currentBalance + amount;
        await this.prisma.$transaction([
            this.prisma.topupRequest.update({
                where: { id },
                data: {
                    status: client_1.TopupStatus.APPROVED,
                    adminNote: note,
                    processedBy: adminId,
                    processedAt: new Date(),
                },
            }),
            this.prisma.user.update({
                where: { id: topup.userId },
                data: { balance: newBalance },
            }),
            this.prisma.transaction.create({
                data: {
                    userId: topup.userId,
                    type: client_1.TransactionType.TOPUP,
                    status: client_1.TransactionStatus.COMPLETED,
                    amount,
                    balanceBefore: currentBalance,
                    balanceAfter: newBalance,
                    description: `টপআপ — ${topup.method} (${topup.transactionId})`,
                    referenceId: id,
                },
            }),
        ]);
        await this.notificationService.create(topup.userId, client_1.NotificationType.SYSTEM, "টপআপ সফল হয়েছে! ✅", `আপনার অ্যাকাউন্টে ৳${amount} যোগ হয়েছে।`);
        await this.notificationService.sendPushToUser(topup.userId, "টপআপ সফল হয়েছে! ✅", `৳${amount} আপনার ব্যালেন্সে যোগ হয়েছে।`, { type: "TOPUP" });
    }
    async rejectTopup(id, adminId, note) {
        const topup = await this.prisma.topupRequest.findUnique({
            where: { id },
        });
        if (!topup)
            throw new common_1.NotFoundException(app_messages_1.AppMessages.topup.notFound);
        if (topup.status !== client_1.TopupStatus.PENDING)
            throw new common_1.BadRequestException(app_messages_1.AppMessages.topup.alreadyProcessed);
        await this.prisma.topupRequest.update({
            where: { id },
            data: {
                status: client_1.TopupStatus.REJECTED,
                adminNote: note,
                processedBy: adminId,
                processedAt: new Date(),
            },
        });
        await this.notificationService.create(topup.userId, client_1.NotificationType.SYSTEM, "টপআপ বাতিল হয়েছে ❌", `আপনার টপআপ অনুরোধ বাতিল হয়েছে। কারণ: ${note}`);
        await this.notificationService.sendPushToUser(topup.userId, "টপআপ বাতিল হয়েছে ❌", `কারণ: ${note}`, { type: "TOPUP_REJECTED" });
    }
};
exports.TopupService = TopupService;
exports.TopupService = TopupService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        notification_service_1.NotificationService])
], TopupService);
//# sourceMappingURL=topup.service.js.map