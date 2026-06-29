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
exports.AdsController = void 0;
const common_1 = require("@nestjs/common");
const ads_service_1 = require("./ads.service");
const create_ad_dto_1 = require("./dto/create-ad.dto");
const watch_ad_dto_1 = require("./dto/watch-ad.dto");
const roles_decorator_1 = require("../../common/decorators/roles.decorator");
const current_user_decorator_1 = require("../../common/decorators/current-user.decorator");
const http_status_1 = __importDefault(require("http-status"));
const helpers_1 = require("../../common/helpers");
const app_messages_1 = require("../../common/AppMessages/app.messages");
let AdsController = class AdsController {
    constructor(adsService) {
        this.adsService = adsService;
    }
    async getAvailableAds(user, res) {
        const data = await this.adsService.getAvailableAds(user.id);
        (0, helpers_1.responseHandler)(res, {
            statusCode: http_status_1.default.OK,
            success: true,
            message: app_messages_1.AppMessages.ads.retrieved,
            data,
        });
    }
    async watchAd(dto, user, res, req) {
        const ipAddress = req.ip || req.headers["x-forwarded-for"];
        const data = await this.adsService.watchAd(user.id, dto, ipAddress);
        (0, helpers_1.responseHandler)(res, {
            statusCode: http_status_1.default.OK,
            success: true,
            message: app_messages_1.AppMessages.ads.watchSuccess(data.rewardEarned),
            data,
        });
    }
    async getDailyStats(user, res) {
        const data = await this.adsService.getDailyStats(user.id);
        (0, helpers_1.responseHandler)(res, {
            statusCode: http_status_1.default.OK,
            success: true,
            message: app_messages_1.AppMessages.ads.statsRetrieved,
            data,
        });
    }
    async getWatchHistory(user, res, page, limit) {
        const data = await this.adsService.getWatchHistory(user.id, page ? parseInt(page) : 1, limit ? parseInt(limit) : 20);
        (0, helpers_1.responseHandler)(res, {
            statusCode: http_status_1.default.OK,
            success: true,
            message: app_messages_1.AppMessages.ads.historyRetrieved,
            data: data.history,
            meta: data.meta,
        });
    }
    async getAllAds(res) {
        const data = await this.adsService.getAllAds();
        (0, helpers_1.responseHandler)(res, {
            statusCode: http_status_1.default.OK,
            success: true,
            message: app_messages_1.AppMessages.ads.retrieved,
            data,
        });
    }
    async toggleAd(id, res) {
        const data = await this.adsService.toggleAdStatus(id);
        (0, helpers_1.responseHandler)(res, {
            statusCode: http_status_1.default.OK,
            success: true,
            message: app_messages_1.AppMessages.ads.toggled,
            data,
        });
    }
    async createAd(dto, user, res) {
        const data = await this.adsService.createAd(dto, user.id);
        (0, helpers_1.responseHandler)(res, {
            statusCode: http_status_1.default.CREATED,
            success: true,
            message: app_messages_1.AppMessages.ads.created,
            data,
        });
    }
    async deleteAd(id, res) {
        const data = await this.adsService.deleteAd(id);
        (0, helpers_1.responseHandler)(res, {
            statusCode: http_status_1.default.OK,
            success: true,
            message: app_messages_1.AppMessages.ads.deleted,
            data,
        });
    }
};
exports.AdsController = AdsController;
__decorate([
    (0, common_1.Get)("available"),
    __param(0, (0, current_user_decorator_1.CurrentUser)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], AdsController.prototype, "getAvailableAds", null);
__decorate([
    (0, common_1.Post)("now"),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, current_user_decorator_1.CurrentUser)()),
    __param(2, (0, common_1.Res)()),
    __param(3, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [watch_ad_dto_1.WatchAdDto, Object, Object, Object]),
    __metadata("design:returntype", Promise)
], AdsController.prototype, "watchAd", null);
__decorate([
    (0, common_1.Get)("stats"),
    __param(0, (0, current_user_decorator_1.CurrentUser)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], AdsController.prototype, "getDailyStats", null);
__decorate([
    (0, common_1.Get)("history"),
    __param(0, (0, current_user_decorator_1.CurrentUser)()),
    __param(1, (0, common_1.Res)()),
    __param(2, (0, common_1.Query)("page")),
    __param(3, (0, common_1.Query)("limit")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, String, String]),
    __metadata("design:returntype", Promise)
], AdsController.prototype, "getWatchHistory", null);
__decorate([
    (0, common_1.Get)("manage"),
    (0, roles_decorator_1.Roles)(roles_decorator_1.Role.ADMIN, roles_decorator_1.Role.OWNER),
    __param(0, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AdsController.prototype, "getAllAds", null);
__decorate([
    (0, common_1.Post)("manage/:id/toggle"),
    (0, roles_decorator_1.Roles)(roles_decorator_1.Role.ADMIN, roles_decorator_1.Role.OWNER),
    __param(0, (0, common_1.Param)("id")),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], AdsController.prototype, "toggleAd", null);
__decorate([
    (0, common_1.Post)("manage"),
    (0, roles_decorator_1.Roles)(roles_decorator_1.Role.OWNER),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, current_user_decorator_1.CurrentUser)()),
    __param(2, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_ad_dto_1.CreateAdDto, Object, Object]),
    __metadata("design:returntype", Promise)
], AdsController.prototype, "createAd", null);
__decorate([
    (0, common_1.Delete)("manage/:id"),
    (0, roles_decorator_1.Roles)(roles_decorator_1.Role.OWNER),
    __param(0, (0, common_1.Param)("id")),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], AdsController.prototype, "deleteAd", null);
exports.AdsController = AdsController = __decorate([
    (0, common_1.Controller)("watch"),
    __metadata("design:paramtypes", [ads_service_1.AdsService])
], AdsController);
//# sourceMappingURL=ads.controller.js.map