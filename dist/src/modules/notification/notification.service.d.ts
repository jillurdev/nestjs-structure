import { PrismaService } from "@/database/prisma/prisma.service";
import { NotificationType } from "@prisma/client";
import { FirebaseService } from "../firebase/firebase.service";
export declare class NotificationService {
    private readonly prisma;
    private readonly firebase;
    constructor(prisma: PrismaService, firebase: FirebaseService);
    create(userId: string, type: NotificationType, title: string, body: string, data?: object): Promise<{
        data: import("@prisma/client/runtime/client").JsonValue | null;
        id: string;
        title: string;
        createdAt: Date;
        type: import(".prisma/client").$Enums.NotificationType;
        userId: string;
        body: string;
        isRead: boolean;
    }>;
    sendPushToUser(userId: string, title: string, body: string, data?: Record<string, string>): Promise<void>;
    createAndSend(userId: string, type: NotificationType, title: string, body: string, data?: Record<string, string>): Promise<{
        data: import("@prisma/client/runtime/client").JsonValue | null;
        id: string;
        title: string;
        createdAt: Date;
        type: import(".prisma/client").$Enums.NotificationType;
        userId: string;
        body: string;
        isRead: boolean;
    }>;
    getUserNotifications(userId: string, page?: number, limit?: number): Promise<{
        notifications: {
            data: import("@prisma/client/runtime/client").JsonValue | null;
            id: string;
            title: string;
            createdAt: Date;
            type: import(".prisma/client").$Enums.NotificationType;
            userId: string;
            body: string;
            isRead: boolean;
        }[];
        unreadCount: number;
        meta: {
            page: number;
            limit: number;
            total: number;
        };
    }>;
    markAsRead(userId: string, notificationId: string): Promise<{
        data: import("@prisma/client/runtime/client").JsonValue | null;
        id: string;
        title: string;
        createdAt: Date;
        type: import(".prisma/client").$Enums.NotificationType;
        userId: string;
        body: string;
        isRead: boolean;
    }>;
    markAllAsRead(userId: string): Promise<{
        message: string;
    }>;
    sendToAll(type: NotificationType, title: string, body: string): Promise<{
        sent: number;
    }>;
}
