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
exports.AdminController = void 0;
const common_1 = require("@nestjs/common");
const admin_service_1 = require("./admin.service");
const admin_dto_1 = require("./dto/admin.dto");
const http_status_1 = __importDefault(require("http-status"));
const helpers_1 = require("../../common/helpers");
const roles_decorator_1 = require("../../common/decorators/roles.decorator");
const app_messages_1 = require("../../common/AppMessages/app.messages");
const current_user_decorator_1 = require("../../common/decorators/current-user.decorator");
let AdminController = class AdminController {
    constructor(adminService) {
        this.adminService = adminService;
    }
    async getDashboard(res) {
        const data = await this.adminService.getDashboardStats();
        (0, helpers_1.responseHandler)(res, {
            statusCode: http_status_1.default.OK,
            success: true,
            message: app_messages_1.AppMessages.admin.dashboardRetrieved,
            data,
        });
    }
    async getRevenue(res, days) {
        const data = await this.adminService.getRevenueRecords(days ? parseInt(days) : 30);
        (0, helpers_1.responseHandler)(res, {
            statusCode: http_status_1.default.OK,
            success: true,
            message: app_messages_1.AppMessages.owner.revenueRetrieved,
            data,
        });
    }
    async getSettings(res) {
        const data = await this.adminService.getSettings();
        (0, helpers_1.responseHandler)(res, {
            statusCode: http_status_1.default.OK,
            success: true,
            message: app_messages_1.AppMessages.owner.settingsRetrieved,
            data,
        });
    }
    async giveBonus(id, dto, user, res) {
        const data = await this.adminService.giveBonus(id, dto.amount, dto.reason, user.id);
        (0, helpers_1.responseHandler)(res, {
            statusCode: http_status_1.default.OK,
            success: true,
            message: app_messages_1.AppMessages.owner.bonusGiven(dto.amount, data.userName),
            data,
        });
    }
};
exports.AdminController = AdminController;
__decorate([
    (0, common_1.Get)("dashboard"),
    __param(0, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AdminController.prototype, "getDashboard", null);
__decorate([
    (0, common_1.Get)("revenue"),
    __param(0, (0, common_1.Res)()),
    __param(1, (0, common_1.Query)("days")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], AdminController.prototype, "getRevenue", null);
__decorate([
    (0, common_1.Get)("settings"),
    __param(0, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AdminController.prototype, "getSettings", null);
__decorate([
    (0, common_1.Post)("users/:id/bonus"),
    __param(0, (0, common_1.Param)("id")),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, current_user_decorator_1.CurrentUser)()),
    __param(3, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, admin_dto_1.GiveBonusDto, Object, Object]),
    __metadata("design:returntype", Promise)
], AdminController.prototype, "giveBonus", null);
exports.AdminController = AdminController = __decorate([
    (0, roles_decorator_1.Roles)(roles_decorator_1.Role.ADMIN, roles_decorator_1.Role.OWNER),
    (0, common_1.Controller)("admin"),
    __metadata("design:paramtypes", [admin_service_1.AdminService])
], AdminController);
//# sourceMappingURL=admin.controller.js.map