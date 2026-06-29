import { Strategy } from "passport-jwt";
import { PrismaService } from "@/database/prisma/prisma.service";
declare const JwtStrategy_base: new (...args: [opt: import("passport-jwt").StrategyOptionsWithRequest] | [opt: import("passport-jwt").StrategyOptionsWithoutRequest]) => Strategy & {
    validate(...args: any[]): unknown;
};
export declare class JwtStrategy extends JwtStrategy_base {
    private readonly prisma;
    constructor(prisma: PrismaService);
    validate(payload: {
        sub: string;
        phone: string;
    }): Promise<{
        id: string;
        email: string | null;
        phone: string;
        referralCode: string | null;
        name: string;
        passwordHash: string;
        role: import(".prisma/client").$Enums.Role;
        avatarUrl: string | null;
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
}
export {};
