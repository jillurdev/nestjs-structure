import { Request, Response } from "express";
import { AuthService } from "./auth.service";
import { RegisterDto } from "./dto/register.dto";
import { LoginDto } from "./dto/login.dto";
import { ChangePasswordDto } from "../users/dto/change-password.dto";
import { JwtUser } from "@/common/interfaces/jwt-user.interface";
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
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
    me(user: JwtUser): Promise<{
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
    logout(req: Request, res: Response): Promise<{
        message: "Logged out successfully";
    }>;
    logoutAllDevices(user: JwtUser, res: Response): Promise<{
        message: "Logged out successfully";
    }>;
    changePassword(user: JwtUser, dto: ChangePasswordDto, res: Response): Promise<{
        message: "Password changed successfully";
    }>;
}
