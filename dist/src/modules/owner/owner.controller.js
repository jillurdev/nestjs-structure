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
exports.OwnerController = void 0;
const common_1 = require("@nestjs/common");
const owner_service_1 = require("./owner.service");
const owner_dto_1 = require("./dto/owner.dto");
const http_status_1 = __importDefault(require("http-status"));
const helpers_1 = require("../../common/helpers");
const roles_decorator_1 = require("../../common/decorators/roles.decorator");
const app_messages_1 = require("../../common/AppMessages/app.messages");
let OwnerController = class OwnerController {
    constructor(ownerService) {
        this.ownerService = ownerService;
    }
    async getOverview(res) {
        const data = await this.ownerService.getOverview();
        (0, helpers_1.responseHandler)(res, {
            statusCode: http_status_1.default.OK,
            success: true,
            message: app_messages_1.AppMessages.owner.overviewRetrieved,
            data,
        });
    }
    async getAdmins(res) {
        const data = await this.ownerService.getAdmins();
        (0, helpers_1.responseHandler)(res, {
            statusCode: http_status_1.default.OK,
            success: true,
            message: app_messages_1.AppMessages.admin.retrieved,
            data,
        });
    }
    async createAdmin(dto, res) {
        const data = await this.ownerService.createAdmin(dto);
        (0, helpers_1.responseHandler)(res, {
            statusCode: http_status_1.default.CREATED,
            success: true,
            message: app_messages_1.AppMessages.admin.created,
            data,
        });
    }
    async toggleAdmin(id, res) {
        const data = await this.ownerService.toggleAdminStatus(id);
        (0, helpers_1.responseHandler)(res, {
            statusCode: http_status_1.default.OK,
            success: true,
            message: app_messages_1.AppMessages.admin.statusUpdated,
            data,
        });
    }
    async deleteAdmin(id, res) {
        const data = await this.ownerService.deleteAdmin(id);
        (0, helpers_1.responseHandler)(res, {
            statusCode: http_status_1.default.OK,
            success: true,
            message: app_messages_1.AppMessages.admin.deleted,
            data,
        });
    }
    async getSettings(res) {
        const data = await this.ownerService.getSettings();
        (0, helpers_1.responseHandler)(res, {
            statusCode: http_status_1.default.OK,
            success: true,
            message: app_messages_1.AppMessages.owner.settingsRetrieved,
            data,
        });
    }
    async updateSetting(key, dto, req, res) {
        const data = await this.ownerService.updateSetting(key, dto.value, req.user.id);
        (0, helpers_1.responseHandler)(res, {
            statusCode: http_status_1.default.OK,
            success: true,
            message: app_messages_1.AppMessages.owner.settingUpdated,
            data,
        });
    }
    async updateMultipleSettings(dto, req, res) {
        const data = await this.ownerService.updateMultipleSettings(dto.settings, req.user.id);
        (0, helpers_1.responseHandler)(res, {
            statusCode: http_status_1.default.OK,
            success: true,
            message: app_messages_1.AppMessages.owner.settingsUpdated,
            data,
        });
    }
    async getRevenue(res, days) {
        const data = await this.ownerService.getRevenueRecords(days ? parseInt(days) : 30);
        (0, helpers_1.responseHandler)(res, {
            statusCode: http_status_1.default.OK,
            success: true,
            message: app_messages_1.AppMessages.owner.revenueRetrieved,
            data,
        });
    }
    async updateRevenue(dto, date, res) {
        const data = await this.ownerService.upsertRevenueRecord(date ? new Date(date) : new Date(), dto);
        (0, helpers_1.responseHandler)(res, {
            statusCode: http_status_1.default.OK,
            success: true,
            message: app_messages_1.AppMessages.owner.revenueUpdated,
            data,
        });
    }
    async giveBonus(id, dto, req, res) {
        const data = await this.ownerService.giveBonus(id, dto.amount, dto.reason, req.user.id);
        (0, helpers_1.responseHandler)(res, {
            statusCode: http_status_1.default.OK,
            success: true,
            message: app_messages_1.AppMessages.owner.bonusGiven(dto.amount, data.userName),
            data,
        });
    }
    async setMaintenance(dto, req, res) {
        const data = await this.ownerService.setMaintenanceMode(dto.enabled, req.user.id);
        (0, helpers_1.responseHandler)(res, {
            statusCode: http_status_1.default.OK,
            success: true,
            message: dto.enabled
                ? app_messages_1.AppMessages.owner.maintenanceEnabled
                : app_messages_1.AppMessages.owner.maintenanceDisabled,
            data,
        });
    }
    async setForceUpdate(dto, req, res) {
        const data = await this.ownerService.setForceUpdate(dto.enabled, dto.version, req.user.id);
        (0, helpers_1.responseHandler)(res, {
            statusCode: http_status_1.default.OK,
            success: true,
            message: app_messages_1.AppMessages.owner.forceUpdateSet(dto.version),
            data,
        });
    }
};
exports.OwnerController = OwnerController;
__decorate([
    (0, common_1.Get)("overview"),
    __param(0, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], OwnerController.prototype, "getOverview", null);
__decorate([
    (0, common_1.Get)("admins"),
    __param(0, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], OwnerController.prototype, "getAdmins", null);
__decorate([
    (0, common_1.Post)("admins"),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [owner_dto_1.CreateAdminDto, Object]),
    __metadata("design:returntype", Promise)
], OwnerController.prototype, "createAdmin", null);
__decorate([
    (0, common_1.Post)("admins/:id/toggle"),
    __param(0, (0, common_1.Param)("id")),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], OwnerController.prototype, "toggleAdmin", null);
__decorate([
    (0, common_1.Delete)("admins/:id"),
    __param(0, (0, common_1.Param)("id")),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], OwnerController.prototype, "deleteAdmin", null);
__decorate([
    (0, common_1.Get)("settings"),
    __param(0, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], OwnerController.prototype, "getSettings", null);
__decorate([
    (0, common_1.Post)("settings/:key"),
    __param(0, (0, common_1.Param)("key")),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.Req)()),
    __param(3, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, owner_dto_1.UpdateSettingDto, Object, Object]),
    __metadata("design:returntype", Promise)
], OwnerController.prototype, "updateSetting", null);
__decorate([
    (0, common_1.Post)("settings"),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Req)()),
    __param(2, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [owner_dto_1.UpdateMultipleSettingsDto, Object, Object]),
    __metadata("design:returntype", Promise)
], OwnerController.prototype, "updateMultipleSettings", null);
__decorate([
    (0, common_1.Get)("revenue"),
    __param(0, (0, common_1.Res)()),
    __param(1, (0, common_1.Query)("days")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], OwnerController.prototype, "getRevenue", null);
__decorate([
    (0, common_1.Post)("revenue"),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Query)("date")),
    __param(2, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [owner_dto_1.RevenueDto, String, Object]),
    __metadata("design:returntype", Promise)
], OwnerController.prototype, "updateRevenue", null);
__decorate([
    (0, common_1.Post)("users/:id/bonus"),
    __param(0, (0, common_1.Param)("id")),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.Req)()),
    __param(3, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, owner_dto_1.GiveBonusDto, Object, Object]),
    __metadata("design:returntype", Promise)
], OwnerController.prototype, "giveBonus", null);
__decorate([
    (0, common_1.Post)("maintenance"),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Req)()),
    __param(2, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [owner_dto_1.MaintenanceDto, Object, Object]),
    __metadata("design:returntype", Promise)
], OwnerController.prototype, "setMaintenance", null);
__decorate([
    (0, common_1.Post)("force-update"),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Req)()),
    __param(2, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [owner_dto_1.ForceUpdateDto, Object, Object]),
    __metadata("design:returntype", Promise)
], OwnerController.prototype, "setForceUpdate", null);
exports.OwnerController = OwnerController = __decorate([
    (0, roles_decorator_1.Roles)(roles_decorator_1.Role.OWNER),
    (0, common_1.Controller)("owner"),
    __metadata("design:paramtypes", [owner_service_1.OwnerService])
], OwnerController);
//# sourceMappingURL=owner.controller.js.map