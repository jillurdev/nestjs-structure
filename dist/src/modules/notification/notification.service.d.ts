import { PrismaService } from "@/database/prisma/prisma.service";
import { NotificationType } from "@prisma/client";
import { FirebaseService } from "../firebase/firebase.service";
export declare class NotificationService {
    private readonly prisma;
    private readonly firebase;
    constructor(prisma: PrismaService, firebase: FirebaseService);
    create(userId: string, type: NotificationType, title: string, body: string, data?: object): Promise<{
        id: string;
        createdAt: Date;
        data: import("@prisma/client/runtime/client").JsonValue | null;
        type: import(".prisma/client").$Enums.NotificationType;
        title: string;
        body: string;
        isRead: boolean;
        userId: string;
    }>;
    sendPushToUser(userId: string, title: string, body: string, data?: Record<string, string>): Promise<void>;
    createAndSend(userId: string, type: NotificationType, title: string, body: string, data?: Record<string, string>): Promise<{
        id: string;
        createdAt: Date;
        data: import("@prisma/client/runtime/client").JsonValue | null;
        type: import(".prisma/client").$Enums.NotificationType;
        title: string;
        body: string;
        isRead: boolean;
        userId: string;
    }>;
    getUserNotifications(userId: string, page?: number, limit?: number): Promise<{
        notifications: {
            id: string;
            createdAt: Date;
            data: import("@prisma/client/runtime/client").JsonValue | null;
            type: import(".prisma/client").$Enums.NotificationType;
            title: string;
            body: string;
            isRead: boolean;
            userId: string;
        }[];
        unreadCount: number;
        meta: {
            page: number;
            limit: number;
            total: number;
        };
    }>;
    markAsRead(userId: string, notificationId: string): Promise<{
        id: string;
        createdAt: Date;
        data: import("@prisma/client/runtime/client").JsonValue | null;
        type: import(".prisma/client").$Enums.NotificationType;
        title: string;
        body: string;
        isRead: boolean;
        userId: string;
    }>;
    markAllAsRead(userId: string): Promise<{
        message: string;
    }>;
    sendToAll(type: NotificationType, title: string, body: string): Promise<{
        sent: number;
    }>;
}
