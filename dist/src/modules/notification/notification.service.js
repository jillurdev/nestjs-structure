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
exports.NotificationService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../database/prisma/prisma.service");
const firebase_service_1 = require("../firebase/firebase.service");
let NotificationService = class NotificationService {
    constructor(prisma, firebase) {
        this.prisma = prisma;
        this.firebase = firebase;
    }
    async create(userId, type, title, body, data) {
        return this.prisma.notification.create({
            data: { userId, type, title, body, data },
        });
    }
    async sendPushToUser(userId, title, body, data) {
        const user = await this.prisma.findUserFieldsOrThrow(userId, {
            fcmToken: true,
        });
        if (!user.fcmToken)
            return;
        await this.firebase.sendToToken(user.fcmToken, title, body, data);
    }
    async createAndSend(userId, type, title, body, data) {
        const notification = await this.prisma.notification.create({
            data: { userId, type, title, body, data },
        });
        try {
            await this.sendPushToUser(userId, title, body, data);
        }
        catch (e) {
            console.warn(`FCM push failed for user ${userId}:`, e);
        }
        return notification;
    }
    async getUserNotifications(userId, page = 1, limit = 20) {
        const skip = (page - 1) * limit;
        const [notifications, total, unreadCount] = await this.prisma.$transaction([
            this.prisma.notification.findMany({
                where: { userId },
                orderBy: { createdAt: "desc" },
                skip,
                take: limit,
            }),
            this.prisma.notification.count({ where: { userId } }),
            this.prisma.notification.count({ where: { userId, isRead: false } }),
        ]);
        return {
            notifications,
            unreadCount,
            meta: { page, limit, total },
        };
    }
    async markAsRead(userId, notificationId) {
        const notification = await this.prisma.notification.findUnique({
            where: { id: notificationId },
        });
        if (!notification || notification.userId !== userId) {
            throw new common_1.NotFoundException("Notification not found");
        }
        return this.prisma.notification.update({
            where: { id: notificationId },
            data: { isRead: true },
        });
    }
    async markAllAsRead(userId) {
        await this.prisma.notification.updateMany({
            where: { userId, isRead: false },
            data: { isRead: true },
        });
        return { message: "All notifications marked as read" };
    }
    async sendToAll(type, title, body) {
        const users = await this.prisma.user.findMany({
            where: { isActive: true },
            select: { id: true, fcmToken: true },
        });
        await this.prisma.notification.createMany({
            data: users.map(u => ({ userId: u.id, type, title, body })),
        });
        const tokens = users.map(u => u.fcmToken).filter((t) => !!t);
        const sent = await this.firebase.sendToMany(tokens, title, body);
        return { sent };
    }
};
exports.NotificationService = NotificationService;
exports.NotificationService = NotificationService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        firebase_service_1.FirebaseService])
], NotificationService);
//# sourceMappingURL=notification.service.js.map