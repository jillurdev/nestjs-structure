import { LoginDto } from "./dto/login.dto";
import { AuthService } from "./auth.service";
import { Request, Response } from "express";
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    login(dto: LoginDto, res: Response): Promise<void>;
    refresh(req: Request, res: Response): Promise<void>;
    getMe(req: any, res: Response): Promise<void>;
    logout(req: any, res: Response): Promise<void>;
}
