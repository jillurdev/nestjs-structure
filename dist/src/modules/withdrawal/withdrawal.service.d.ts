import { PrismaService } from "@/database/prisma/prisma.service";
import { CreateWithdrawalDto } from "./dto/withdrawal.dto";
import { WithdrawalStatus } from "@prisma/client";
import { NotificationService } from "../notification/notification.service";
export declare class WithdrawalService {
    private readonly prisma;
    private readonly notificationService;
    constructor(prisma: PrismaService, notificationService: NotificationService);
    requestWithdrawal(userId: string, dto: CreateWithdrawalDto): Promise<{
        id: string;
        userId: string;
        amount: import("@prisma/client-runtime-utils").Decimal;
        method: import(".prisma/client").$Enums.WithdrawalMethod;
        status: import(".prisma/client").$Enums.WithdrawalStatus;
        adminNote: string | null;
        processedBy: string | null;
        requestedAt: Date;
        processedAt: Date | null;
        accountNumber: string;
        accountName: string | null;
    }>;
    getUserWithdrawals(userId: string, page?: number, limit?: number): Promise<{
        withdrawals: {
            id: string;
            userId: string;
            amount: import("@prisma/client-runtime-utils").Decimal;
            method: import(".prisma/client").$Enums.WithdrawalMethod;
            status: import(".prisma/client").$Enums.WithdrawalStatus;
            adminNote: string | null;
            processedBy: string | null;
            requestedAt: Date;
            processedAt: Date | null;
            accountNumber: string;
            accountName: string | null;
        }[];
        meta: {
            page: number;
            limit: number;
            total: number;
        };
    }>;
    getAllWithdrawals(status?: WithdrawalStatus, page?: number, limit?: number): Promise<{
        withdrawals: ({
            user: {
                id: string;
                name: string;
                phone: string;
                subscriptionType: import(".prisma/client").$Enums.SubscriptionType;
            };
        } & {
            id: string;
            userId: string;
            amount: import("@prisma/client-runtime-utils").Decimal;
            method: import(".prisma/client").$Enums.WithdrawalMethod;
            status: import(".prisma/client").$Enums.WithdrawalStatus;
            adminNote: string | null;
            processedBy: string | null;
            requestedAt: Date;
            processedAt: Date | null;
            accountNumber: string;
            accountName: string | null;
        })[];
        meta: {
            page: number;
            limit: number;
            total: number;
        };
    }>;
    approveWithdrawal(id: string, adminId: string, note?: string): Promise<{
        message: "উত্তোলন অনুমোদন করা হয়েছে";
    }>;
    rejectWithdrawal(id: string, adminId: string, note: string): Promise<{
        message: "উত্তোলন বাতিল করা হয়েছে";
    }>;
    getWalletSummary(userId: string): Promise<{
        balance: import("@prisma/client-runtime-utils").Decimal;
        totalEarned: import("@prisma/client-runtime-utils").Decimal;
        totalWithdrawn: import("@prisma/client-runtime-utils").Decimal;
        minWithdrawal: number;
        recentTransactions: {
            id: string;
            description: string | null;
            createdAt: Date;
            type: import(".prisma/client").$Enums.TransactionType;
            userId: string;
            amount: import("@prisma/client-runtime-utils").Decimal;
            status: import(".prisma/client").$Enums.TransactionStatus;
            balanceBefore: import("@prisma/client-runtime-utils").Decimal;
            balanceAfter: import("@prisma/client-runtime-utils").Decimal;
            referenceId: string | null;
        }[];
    }>;
}
