import { PrismaService } from "@/database/prisma/prisma.service";
import { UpdateUserDto } from "./dto/update-user.dto";
import { CreateUserDto } from "./dto/create-user.dto";
import { ReferralService } from "../referral/referral.service";
export declare class UsersService {
    private readonly prisma;
    private readonly referralService;
    constructor(prisma: PrismaService, referralService: ReferralService);
    private generateReferralCode;
    findAllUsers(): Promise<{
        id: string;
        isActive: boolean;
        createdAt: Date;
        name: string;
        email: string | null;
        phone: string;
        role: import(".prisma/client").$Enums.Role;
        balance: import("@prisma/client-runtime-utils").Decimal;
        totalEarned: import("@prisma/client-runtime-utils").Decimal;
        totalWithdrawn: import("@prisma/client-runtime-utils").Decimal;
        subscriptionType: import(".prisma/client").$Enums.SubscriptionType;
        isBanned: boolean;
    }[]>;
    findUserById(id: string): Promise<{
        id: string;
        isActive: boolean;
        createdAt: Date;
        name: string;
        email: string | null;
        phone: string;
        passwordHash: string;
        role: import(".prisma/client").$Enums.Role;
        avatarUrl: string | null;
        referralCode: string | null;
        balance: import("@prisma/client-runtime-utils").Decimal;
        totalEarned: import("@prisma/client-runtime-utils").Decimal;
        totalWithdrawn: import("@prisma/client-runtime-utils").Decimal;
        subscriptionType: import(".prisma/client").$Enums.SubscriptionType;
        isBanned: boolean;
        banReason: string | null;
        deviceId: string | null;
        lastLoginAt: Date | null;
    }>;
    findUserByPhone(phone: string): Promise<{
        id: string;
        isActive: boolean;
        createdAt: Date;
        updatedAt: Date;
        name: string;
        email: string | null;
        phone: string;
        passwordHash: string;
        role: import(".prisma/client").$Enums.Role;
        avatarUrl: string | null;
        referralCode: string | null;
        refreshToken: string | null;
        balance: import("@prisma/client-runtime-utils").Decimal;
        totalEarned: import("@prisma/client-runtime-utils").Decimal;
        totalWithdrawn: import("@prisma/client-runtime-utils").Decimal;
        subscriptionType: import(".prisma/client").$Enums.SubscriptionType;
        isBanned: boolean;
        banReason: string | null;
        bannedAt: Date | null;
        bannedBy: string | null;
        fcmToken: string | null;
        deviceId: string | null;
        lastLoginAt: Date | null;
    } | null>;
    createUser(dto: CreateUserDto): Promise<{
        id: string;
        createdAt: Date;
        name: string;
        email: string | null;
        phone: string;
        role: import(".prisma/client").$Enums.Role;
        referralCode: string | null;
        balance: import("@prisma/client-runtime-utils").Decimal;
        subscriptionType: import(".prisma/client").$Enums.SubscriptionType;
    }>;
    saveFcmToken(userId: string, fcmToken: string): Promise<{
        id: string;
    }>;
    updateUser(id: string, dto: UpdateUserDto): Promise<{
        id: string;
        updatedAt: Date;
        name: string;
        email: string | null;
        phone: string;
        role: import(".prisma/client").$Enums.Role;
        avatarUrl: string | null;
        subscriptionType: import(".prisma/client").$Enums.SubscriptionType;
    }>;
    changePassword(id: string, currentPassword: string, newPassword: string): Promise<void>;
    banUser(id: string, reason: string, adminId: string): Promise<{
        id: string;
        isBanned: boolean;
        banReason: string | null;
    }>;
    unbanUser(id: string): Promise<{
        id: string;
        isBanned: boolean;
    }>;
    getUserStats(id: string): Promise<{
        balance: import("@prisma/client-runtime-utils").Decimal;
        totalEarned: import("@prisma/client-runtime-utils").Decimal;
        totalWithdrawn: import("@prisma/client-runtime-utils").Decimal;
        subscriptionType: import(".prisma/client").$Enums.SubscriptionType;
        todayWatchCount: number;
        todayEarned: number | import("@prisma/client-runtime-utils").Decimal;
    }>;
    deleteUser(id: string): Promise<{
        message: "ব্যবহারকারী মুছে ফেলা হয়েছে";
    }>;
}
