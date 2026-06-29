import { PrismaService } from "@/database/prisma/prisma.service";
import { UpdateUserDto } from "./dto/update-user.dto";
export declare class UsersService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    findAllUsers(): Promise<{
        id: string;
        name: string;
        email: string | null;
        phone: string;
        role: import(".prisma/client").$Enums.Role;
        balance: import("@prisma/client-runtime-utils").Decimal;
        totalEarned: import("@prisma/client-runtime-utils").Decimal;
        totalWithdrawn: import("@prisma/client-runtime-utils").Decimal;
        subscriptionType: import(".prisma/client").$Enums.SubscriptionType;
        isActive: boolean;
        isBanned: boolean;
        createdAt: Date;
    }[]>;
    findUserById(id: string): Promise<{
        id: string;
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
        isActive: boolean;
        isBanned: boolean;
        banReason: string | null;
        bannedAt: Date | null;
        bannedBy: string | null;
        fcmToken: string | null;
        deviceId: string | null;
        lastLoginAt: Date | null;
        createdAt: Date;
        updatedAt: Date;
    }>;
    findUserByPhone(phone: string): Promise<{
        id: string;
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
        isActive: boolean;
        isBanned: boolean;
        banReason: string | null;
        bannedAt: Date | null;
        bannedBy: string | null;
        fcmToken: string | null;
        deviceId: string | null;
        lastLoginAt: Date | null;
        createdAt: Date;
        updatedAt: Date;
    } | null>;
    saveFcmToken(userId: string, fcmToken: string): Promise<{
        id: string;
    }>;
    updateUser(id: string, dto: UpdateUserDto): Promise<{
        id: string;
        name: string;
        email: string | null;
        phone: string;
        role: import(".prisma/client").$Enums.Role;
        avatarUrl: string | null;
        subscriptionType: import(".prisma/client").$Enums.SubscriptionType;
        updatedAt: Date;
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
    deleteUser(id: string): Promise<{
        message: "User deleted successfully";
    }>;
}
