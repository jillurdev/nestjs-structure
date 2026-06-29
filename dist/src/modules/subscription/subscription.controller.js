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
exports.SubscriptionController = void 0;
const common_1 = require("@nestjs/common");
const subscription_service_1 = require("./subscription.service");
const current_user_decorator_1 = require("../../common/decorators/current-user.decorator");
const http_status_1 = __importDefault(require("http-status"));
const helpers_1 = require("../../common/helpers");
const roles_decorator_1 = require("../../common/decorators/roles.decorator");
const app_messages_1 = require("../../common/AppMessages/app.messages");
let SubscriptionController = class SubscriptionController {
    constructor(subscriptionService) {
        this.subscriptionService = subscriptionService;
    }
    async getPlans(res) {
        const data = await this.subscriptionService.getPlans();
        (0, helpers_1.responseHandler)(res, {
            statusCode: http_status_1.default.OK,
            success: true,
            message: app_messages_1.AppMessages.subscription.plansRetrieved,
            data,
        });
    }
    async getStatus(user, res) {
        const data = await this.subscriptionService.getStatus(user.id);
        (0, helpers_1.responseHandler)(res, {
            statusCode: http_status_1.default.OK,
            success: true,
            message: app_messages_1.AppMessages.subscription.statusRetrieved,
            data,
        });
    }
    async upgrade(user, res) {
        const data = await this.subscriptionService.upgradeToPremium(user.id);
        (0, helpers_1.responseHandler)(res, {
            statusCode: http_status_1.default.OK,
            success: true,
            message: app_messages_1.AppMessages.subscription.upgradeSuccess,
            data,
        });
    }
    async getAllSubscriptions(res, page, limit) {
        const data = await this.subscriptionService.getAllSubscriptions(page ? parseInt(page) : 1, limit ? parseInt(limit) : 20);
        (0, helpers_1.responseHandler)(res, {
            statusCode: http_status_1.default.OK,
            success: true,
            message: app_messages_1.AppMessages.subscription.allRetrieved,
            data: data.subscriptions,
            meta: data.meta,
        });
    }
};
exports.SubscriptionController = SubscriptionController;
__decorate([
    (0, common_1.Get)("plans"),
    __param(0, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], SubscriptionController.prototype, "getPlans", null);
__decorate([
    (0, common_1.Get)("status"),
    __param(0, (0, current_user_decorator_1.CurrentUser)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], SubscriptionController.prototype, "getStatus", null);
__decorate([
    (0, common_1.Post)("upgrade"),
    __param(0, (0, current_user_decorator_1.CurrentUser)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], SubscriptionController.prototype, "upgrade", null);
__decorate([
    (0, roles_decorator_1.Roles)(roles_decorator_1.Role.ADMIN, roles_decorator_1.Role.OWNER),
    (0, common_1.Get)("admin/all"),
    __param(0, (0, common_1.Res)()),
    __param(1, (0, common_1.Query)("page")),
    __param(2, (0, common_1.Query)("limit")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, String]),
    __metadata("design:returntype", Promise)
], SubscriptionController.prototype, "getAllSubscriptions", null);
exports.SubscriptionController = SubscriptionController = __decorate([
    (0, common_1.Controller)("subscription"),
    __metadata("design:paramtypes", [subscription_service_1.SubscriptionService])
], SubscriptionController);
//# sourceMappingURL=subscription.controller.js.map