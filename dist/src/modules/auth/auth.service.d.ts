import { JwtService } from "@nestjs/jwt";
import { LoginDto } from "./dto/login.dto";
import { PrismaService } from "@/database/prisma/prisma.service";
import { Response } from "express";
export declare class AuthService {
    private readonly prisma;
    private readonly jwt;
    constructor(prisma: PrismaService, jwt: JwtService);
    login(dto: LoginDto, res: Response): Promise<{
        accessToken: string;
        user: {
            id: string;
            name: string;
            email: string | null;
            phone: string;
            role: import(".prisma/client").$Enums.Role;
            referralCode: string | null;
            subscriptionType: import(".prisma/client").$Enums.SubscriptionType;
            balance: import("@prisma/client-runtime-utils").Decimal;
            totalEarned: import("@prisma/client-runtime-utils").Decimal;
            avatarUrl: string | null;
        };
    }>;
    logout(userId: string, res: Response): Promise<{
        message: "লগআউট সফল হয়েছে";
    }>;
    refreshToken(token: string, res: Response): Promise<{
        accessToken: string;
    }>;
}
