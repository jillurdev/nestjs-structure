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
        role: string;
    }): Promise<{
        id: string;
        isActive: boolean;
        name: string;
        email: string | null;
        phone: string;
        role: import(".prisma/client").$Enums.Role;
        balance: import("@prisma/client-runtime-utils").Decimal;
        subscriptionType: import(".prisma/client").$Enums.SubscriptionType;
        isBanned: boolean;
    }>;
}
export {};
