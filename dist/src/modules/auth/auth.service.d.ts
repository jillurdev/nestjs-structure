import { Request, Response } from "express";
import { PrismaService } from "@/database/prisma/prisma.service";
import { JwtService } from "@nestjs/jwt";
import { RegisterDto } from "./dto/register.dto";
import { LoginDto } from "./dto/login.dto";
import { ChangePasswordDto } from "../users/dto/change-password.dto";
export declare class AuthService {
    private readonly prisma;
    private readonly jwt;
    constructor(prisma: PrismaService, jwt: JwtService);
    private generateTokens;
    private setAuthCookies;
    private generateUniqueHandle;
    private generateVirtualAccountNumber;
    private validateUserStatus;
    private getClientIp;
    private getUserAgent;
    register(dto: RegisterDto, req: Request, res: Response): Promise<{
        message: "Your account is pending verification.";
    }>;
    login(dto: LoginDto, req: Request, res: Response): Promise<{
        message: "Logged in successfully";
        data: {
            accessToken: string;
            user: {
                id: string;
                handle: any;
                fullName: any;
                email: string | null;
                phone: string;
                avatarUrl: string | null;
                status: any;
                isVerified: any;
                kycTier: any;
            };
        };
    }>;
    refreshToken(req: Request, res: Response): Promise<{
        message: "Session refreshed successfully";
        data: {
            accessToken: string;
        };
    }>;
    logout(req: Request, res: Response): Promise<{
        message: "Logged out successfully";
    }>;
    logoutAllDevices(userId: string, res: Response): Promise<{
        message: "Logged out successfully";
    }>;
    me(userId: string): Promise<{
        id: string;
        handle: any;
        fullName: any;
        email: string | null;
        phone: string;
        avatarUrl: string | null;
        bio: any;
        status: any;
        isVerified: any;
        kycTier: any;
        vybeScore: any;
        createdAt: Date;
        account: {
            id: any;
            virtualAccountNumber: any;
            balance: any;
            currency: any;
            accountType: any;
        } | null;
    }>;
    changePassword(userId: string, dto: ChangePasswordDto, res: Response): Promise<{
        message: "Password changed successfully";
    }>;
}
