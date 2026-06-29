"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersController = void 0;
const common_1 = require("@nestjs/common");
const users_service_1 = require("./users.service");
const update_user_dto_1 = require("./dto/update-user.dto");
const http_status_1 = __importDefault(require("http-status"));
const helpers_1 = require("../../common/helpers");
const roles_decorator_1 = require("../../common/decorators/roles.decorator");
const app_messages_1 = require("../../common/AppMessages/app.messages");
const create_user_dto_1 = require("./dto/create-user.dto");
const public_decorator_1 = require("../../common/decorators/public.decorator");
const current_user_decorator_1 = require("../../common/decorators/current-user.decorator");
const change_password_dto_1 = require("./dto/change-password.dto");
let UsersController = class UsersController {
    constructor(usersService) {
        this.usersService = usersService;
    }
    async register(dto, res) {
        const data = await this.usersService.createUser(dto);
        (0, helpers_1.responseHandler)(res, {
            statusCode: http_status_1.default.CREATED,
            success: true,
            message: app_messages_1.AppMessages.auth.registerSuccess,
            data,
        });
    }
    async getMe(req, res) {
        const data = await this.usersService.findUserById(req.user.id);
        (0, helpers_1.responseHandler)(res, {
            statusCode: http_status_1.default.OK,
            success: true,
            message: app_messages_1.AppMessages.user.retrieved,
            data,
        });
    }
    async getMyStats(req, res) {
        const data = await this.usersService.getUserStats(req.user.id);
        (0, helpers_1.responseHandler)(res, {
            statusCode: http_status_1.default.OK,
            success: true,
            message: app_messages_1.AppMessages.user.retrieved,
            data,
        });
    }
    async saveFcmToken(body, req, res) {
        const data = await this.usersService.saveFcmToken(req.user.id, body.fcmToken);
        (0, helpers_1.responseHandler)(res, {
            statusCode: http_status_1.default.OK,
            success: true,
            message: "FCM token saved",
            data,
        });
    }
    async getUser(id, res) {
        const data = await this.usersService.findUserById(id);
        (0, helpers_1.responseHandler)(res, {
            statusCode: http_status_1.default.OK,
            success: true,
            message: app_messages_1.AppMessages.user.retrieved,
            data,
        });
    }
    async updateUser(id, dto, res) {
        const data = await this.usersService.updateUser(id, dto);
        (0, helpers_1.responseHandler)(res, {
            statusCode: http_status_1.default.OK,
            success: true,
            message: app_messages_1.AppMessages.user.profileUpdated,
            data,
        });
    }
    async updateMe(user, dto, res) {
        const data = await this.usersService.updateUser(user.id, dto);
        (0, helpers_1.responseHandler)(res, {
            statusCode: http_status_1.default.OK,
            success: true,
            message: app_messages_1.AppMessages.user.profileUpdated,
            data,
        });
    }
    async changePassword(user, dto, res) {
        await this.usersService.changePassword(user.id, dto.currentPassword, dto.newPassword);
        (0, helpers_1.responseHandler)(res, {
            statusCode: http_status_1.default.OK,
            success: true,
            message: app_messages_1.AppMessages.user.passwordChanged,
            data: null,
        });
    }
    async getAllUsers(res) {
        const data = await this.usersService.findAllUsers();
        (0, helpers_1.responseHandler)(res, {
            statusCode: http_status_1.default.OK,
            success: true,
            message: app_messages_1.AppMessages.user.retrieved,
            data,
        });
    }
    async banUser(id, body, req, res) {
        const data = await this.usersService.banUser(id, body.reason, req.user.id);
        (0, helpers_1.responseHandler)(res, {
            statusCode: http_status_1.default.OK,
            success: true,
            message: app_messages_1.AppMessages.user.banned(body.reason),
            data,
        });
    }
    async unbanUser(id, res) {
        const data = await this.usersService.unbanUser(id);
        (0, helpers_1.responseHandler)(res, {
            statusCode: http_status_1.default.OK,
            success: true,
            message: app_messages_1.AppMessages.user.unbanned,
            data,
        });
    }
    async deleteUser(id, res) {
        const data = await this.usersService.deleteUser(id);
        (0, helpers_1.responseHandler)(res, {
            statusCode: http_status_1.default.OK,
            success: true,
            message: app_messages_1.AppMessages.user.deleted,
            data,
        });
    }
};
exports.UsersController = UsersController;
__decorate([
    (0, public_decorator_1.Public)(),
    (0, common_1.Post)("register"),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_user_dto_1.CreateUserDto, Object]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "register", null);
__decorate([
    (0, common_1.Get)("me"),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "getMe", null);
__decorate([
    (0, common_1.Get)("me/stats"),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "getMyStats", null);
__decorate([
    (0, common_1.Post)("me/fcm-token"),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Req)()),
    __param(2, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Object]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "saveFcmToken", null);
__decorate([
    (0, common_1.Get)(":id"),
    __param(0, (0, common_1.Param)("id")),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "getUser", null);
__decorate([
    (0, common_1.Put)(":id"),
    __param(0, (0, common_1.Param)("id")),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_user_dto_1.UpdateUserDto, Object]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "updateUser", null);
__decorate([
    (0, common_1.Patch)("me"),
    __param(0, (0, current_user_decorator_1.CurrentUser)()),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, update_user_dto_1.UpdateUserDto, Object]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "updateMe", null);
__decorate([
    (0, common_1.Patch)("me/password"),
    __param(0, (0, current_user_decorator_1.CurrentUser)()),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, change_password_dto_1.ChangePasswordDto, Object]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "changePassword", null);
__decorate([
    (0, roles_decorator_1.Roles)(roles_decorator_1.Role.ADMIN, roles_decorator_1.Role.OWNER),
    (0, common_1.Get)(),
    __param(0, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "getAllUsers", null);
__decorate([
    (0, roles_decorator_1.Roles)(roles_decorator_1.Role.ADMIN, roles_decorator_1.Role.OWNER),
    (0, common_1.Post)(":id/ban"),
    __param(0, (0, common_1.Param)("id")),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.Req)()),
    __param(3, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object, Object, Object]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "banUser", null);
__decorate([
    (0, roles_decorator_1.Roles)(roles_decorator_1.Role.ADMIN, roles_decorator_1.Role.OWNER),
    (0, common_1.Post)(":id/unban"),
    __param(0, (0, common_1.Param)("id")),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "unbanUser", null);
__decorate([
    (0, roles_decorator_1.Roles)(roles_decorator_1.Role.OWNER),
    (0, common_1.Delete)(":id"),
    __param(0, (0, common_1.Param)("id")),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "deleteUser", null);
exports.UsersController = UsersController = __decorate([
    (0, common_1.Controller)("users"),
    __metadata("design:paramtypes", [users_service_1.UsersService])
], UsersController);
//# sourceMappingURL=users.controller.js.map