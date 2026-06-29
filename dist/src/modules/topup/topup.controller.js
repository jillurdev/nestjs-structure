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
exports.TopupController = void 0;
const common_1 = require("@nestjs/common");
const topup_service_1 = require("./topup.service");
const topup_dto_1 = require("./dto/topup.dto");
const current_user_decorator_1 = require("../../common/decorators/current-user.decorator");
const roles_decorator_1 = require("../../common/decorators/roles.decorator");
const http_status_1 = __importDefault(require("http-status"));
const helpers_1 = require("../../common/helpers");
const app_messages_1 = require("../../common/AppMessages/app.messages");
const client_1 = require("@prisma/client");
let TopupController = class TopupController {
    constructor(topupService) {
        this.topupService = topupService;
    }
    async requestTopup(dto, user, res) {
        const data = await this.topupService.requestTopup(user.id, dto);
        (0, helpers_1.responseHandler)(res, {
            statusCode: http_status_1.default.CREATED,
            success: true,
            message: app_messages_1.AppMessages.topup.requested,
            data,
        });
    }
    async getHistory(user, res, page, limit) {
        const data = await this.topupService.getUserTopups(user.id, page ? parseInt(page) : 1, limit ? parseInt(limit) : 10);
        (0, helpers_1.responseHandler)(res, {
            statusCode: http_status_1.default.OK,
            success: true,
            message: app_messages_1.AppMessages.topup.historyRetrieved,
            data: data.topups,
            meta: data.meta,
        });
    }
    async getAllTopups(res, status, page, limit) {
        const data = await this.topupService.getAllTopups(status, page ? parseInt(page) : 1, limit ? parseInt(limit) : 20);
        (0, helpers_1.responseHandler)(res, {
            statusCode: http_status_1.default.OK,
            success: true,
            message: app_messages_1.AppMessages.topup.retrieved,
            data: data.topups,
            meta: data.meta,
        });
    }
    async approve(id, dto, user, res) {
        await this.topupService.approveTopup(id, user.id, dto.adminNote);
        (0, helpers_1.responseHandler)(res, {
            statusCode: http_status_1.default.OK,
            success: true,
            message: app_messages_1.AppMessages.topup.approved,
            data: null,
        });
    }
    async reject(id, dto, user, res) {
        await this.topupService.rejectTopup(id, user.id, dto.adminNote ?? "");
        (0, helpers_1.responseHandler)(res, {
            statusCode: http_status_1.default.OK,
            success: true,
            message: app_messages_1.AppMessages.topup.rejected,
            data: null,
        });
    }
};
exports.TopupController = TopupController;
__decorate([
    (0, common_1.Post)("request"),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, current_user_decorator_1.CurrentUser)()),
    __param(2, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [topup_dto_1.CreateTopupDto, Object, Object]),
    __metadata("design:returntype", Promise)
], TopupController.prototype, "requestTopup", null);
__decorate([
    (0, common_1.Get)("history"),
    __param(0, (0, current_user_decorator_1.CurrentUser)()),
    __param(1, (0, common_1.Res)()),
    __param(2, (0, common_1.Query)("page")),
    __param(3, (0, common_1.Query)("limit")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, String, String]),
    __metadata("design:returntype", Promise)
], TopupController.prototype, "getHistory", null);
__decorate([
    (0, roles_decorator_1.Roles)(roles_decorator_1.Role.ADMIN, roles_decorator_1.Role.OWNER),
    (0, common_1.Get)("admin/all"),
    __param(0, (0, common_1.Res)()),
    __param(1, (0, common_1.Query)("status")),
    __param(2, (0, common_1.Query)("page")),
    __param(3, (0, common_1.Query)("limit")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, String, String]),
    __metadata("design:returntype", Promise)
], TopupController.prototype, "getAllTopups", null);
__decorate([
    (0, roles_decorator_1.Roles)(roles_decorator_1.Role.ADMIN, roles_decorator_1.Role.OWNER),
    (0, common_1.Post)("admin/:id/approve"),
    __param(0, (0, common_1.Param)("id")),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, current_user_decorator_1.CurrentUser)()),
    __param(3, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, topup_dto_1.ProcessTopupDto, Object, Object]),
    __metadata("design:returntype", Promise)
], TopupController.prototype, "approve", null);
__decorate([
    (0, roles_decorator_1.Roles)(roles_decorator_1.Role.ADMIN, roles_decorator_1.Role.OWNER),
    (0, common_1.Post)("admin/:id/reject"),
    __param(0, (0, common_1.Param)("id")),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, current_user_decorator_1.CurrentUser)()),
    __param(3, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, topup_dto_1.ProcessTopupDto, Object, Object]),
    __metadata("design:returntype", Promise)
], TopupController.prototype, "reject", null);
exports.TopupController = TopupController = __decorate([
    (0, common_1.Controller)("topup"),
    __metadata("design:paramtypes", [topup_service_1.TopupService])
], TopupController);
//# sourceMappingURL=topup.controller.js.map