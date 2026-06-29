import { NotificationService } from "./notification.service";
import { Response } from "express";
import { NotificationType } from "@prisma/client";
declare class SendNotificationDto {
    type: NotificationType;
    title: string;
    body: string;
}
export declare class NotificationController {
    private readonly notificationService;
    constructor(notificationService: NotificationService);
    getNotifications(req: any, res: Response, page?: string, limit?: string): Promise<void>;
    markAsRead(id: string, req: any, res: Response): Promise<void>;
    markAllAsRead(req: any, res: Response): Promise<void>;
    sendToAll(dto: SendNotificationDto, res: Response): Promise<void>;
}
export {};
