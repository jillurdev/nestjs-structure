import { PrismaService } from "@/database/prisma/prisma.service";
import { TopupStatus } from "@prisma/client";
import { CreateTopupDto } from "./dto/topup.dto";
import { NotificationService } from "../notification/notification.service";
export declare class TopupService {
    private readonly prisma;
    private readonly notificationService;
    constructor(prisma: PrismaService, notificationService: NotificationService);
    requestTopup(userId: string, dto: CreateTopupDto): Promise<{
        id: string;
        userId: string;
        amount: import("@prisma/client-runtime-utils").Decimal;
        method: import(".prisma/client").$Enums.TopupMethod;
        transactionId: string;
        senderNumber: string;
        status: import(".prisma/client").$Enums.TopupStatus;
        adminNote: string | null;
        processedBy: string | null;
        requestedAt: Date;
        processedAt: Date | null;
    }>;
    getUserTopups(userId: string, page?: number, limit?: number): Promise<{
        topups: {
            id: string;
            userId: string;
            amount: import("@prisma/client-runtime-utils").Decimal;
            method: import(".prisma/client").$Enums.TopupMethod;
            transactionId: string;
            senderNumber: string;
            status: import(".prisma/client").$Enums.TopupStatus;
            adminNote: string | null;
            processedBy: string | null;
            requestedAt: Date;
            processedAt: Date | null;
        }[];
        meta: {
            page: number;
            limit: number;
            total: number;
        };
    }>;
    getAllTopups(status?: TopupStatus, page?: number, limit?: number): Promise<{
        topups: ({
            user: {
                id: string;
                name: string;
                phone: string;
            };
        } & {
            id: string;
            userId: string;
            amount: import("@prisma/client-runtime-utils").Decimal;
            method: import(".prisma/client").$Enums.TopupMethod;
            transactionId: string;
            senderNumber: string;
            status: import(".prisma/client").$Enums.TopupStatus;
            adminNote: string | null;
            processedBy: string | null;
            requestedAt: Date;
            processedAt: Date | null;
        })[];
        meta: {
            page: number;
            limit: number;
            total: number;
        };
    }>;
    approveTopup(id: string, adminId: string, note?: string): Promise<void>;
    rejectTopup(id: string, adminId: string, note: string): Promise<void>;
}
