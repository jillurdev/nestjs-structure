import { Injectable, NotFoundException } from "@nestjs/common";
import { PrismaService } from "@/database/prisma/prisma.service";
import { NotificationType } from "@prisma/client";
import { FirebaseService } from "../firebase/firebase.service";

@Injectable()
export class NotificationService {
	constructor(
		private readonly prisma: PrismaService,
		private readonly firebase: FirebaseService,
	) {}
	// ─── Create notification ──────────────────────────────────────
	async create(
		userId: string,
		type: NotificationType,
		title: string,
		body: string,
		data?: object,
	) {
		return this.prisma.notification.create({
			data: { userId, type, title, body, data },
		});
	}

	async sendPushToUser(
		userId: string,
		title: string,
		body: string,
		data?: Record<string, string>,
	) {
		const user = await this.prisma.findUserFieldsOrThrow(userId, {
			fcmToken: true,
		});

		if (!user.fcmToken) return;

		await this.firebase.sendToToken(user.fcmToken, title, body, data);
	}

	// ─── Create + Send Push (combined) ───────────────────────────
	async createAndSend(
		userId: string,
		type: NotificationType,
		title: string,
		body: string,
		data?: Record<string, string>,
	) {
		// DB save
		const notification = await this.prisma.notification.create({
			data: { userId, type, title, body, data },
		});

		try {
			await this.sendPushToUser(userId, title, body, data);
		} catch (e) {
			console.warn(`FCM push failed for user ${userId}:`, e);
		}

		return notification;
	}

	// ─── Get user notifications ───────────────────────────────────
	async getUserNotifications(userId: string, page = 1, limit = 20) {
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

	// ─── Mark as read ─────────────────────────────────────────────
	async markAsRead(userId: string, notificationId: string) {
		const notification = await this.prisma.notification.findUnique({
			where: { id: notificationId },
		});

		if (!notification || notification.userId !== userId) {
			throw new NotFoundException("Notification not found");
		}

		return this.prisma.notification.update({
			where: { id: notificationId },
			data: { isRead: true },
		});
	}

	// ─── Mark all as read ─────────────────────────────────────────
	async markAllAsRead(userId: string) {
		await this.prisma.notification.updateMany({
			where: { userId, isRead: false },
			data: { isRead: true },
		});

		return { message: "All notifications marked as read" };
	}

	// ─── Admin: Send to all users ─────────────────────────────────
	async sendToAll(type: NotificationType, title: string, body: string) {
		const users = await this.prisma.user.findMany({
			where: { isActive: true },
			select: { id: true, fcmToken: true },
		});

		// DB notification
		await this.prisma.notification.createMany({
			data: users.map(u => ({ userId: u.id, type, title, body })),
		});

		// FCM push
		const tokens = users.map(u => u.fcmToken).filter((t): t is string => !!t);

		const sent = await this.firebase.sendToMany(tokens, title, body);

		return { sent };
	}
}
