import { UsersService } from "./users.service";
import { UpdateUserDto } from "./dto/update-user.dto";
import { Response } from "express";
import { CreateUserDto } from "./dto/create-user.dto";
import { ChangePasswordDto } from "./dto/change-password.dto";
export declare class UsersController {
    private readonly usersService;
    constructor(usersService: UsersService);
    register(dto: CreateUserDto, res: Response): Promise<void>;
    getMe(req: any, res: Response): Promise<void>;
    getMyStats(req: any, res: Response): Promise<void>;
    saveFcmToken(body: {
        fcmToken: string;
    }, req: any, res: Response): Promise<void>;
    getUser(id: string, res: Response): Promise<void>;
    updateUser(id: string, dto: UpdateUserDto, res: Response): Promise<void>;
    updateMe(user: {
        id: string;
    }, dto: UpdateUserDto, res: Response): Promise<void>;
    changePassword(user: {
        id: string;
    }, dto: ChangePasswordDto, res: Response): Promise<void>;
    getAllUsers(res: Response): Promise<void>;
    banUser(id: string, body: {
        reason: string;
    }, req: any, res: Response): Promise<void>;
    unbanUser(id: string, res: Response): Promise<void>;
    deleteUser(id: string, res: Response): Promise<void>;
}
