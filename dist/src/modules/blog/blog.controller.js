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
exports.BlogController = void 0;
const common_1 = require("@nestjs/common");
const blog_service_1 = require("./blog.service");
const http_status_1 = __importDefault(require("http-status"));
const helpers_1 = require("../../common/helpers");
const roles_decorator_1 = require("../../common/decorators/roles.decorator");
const public_decorator_1 = require("../../common/decorators/public.decorator");
const create_blog_dto_1 = require("./dto/create-blog.dto");
const update_blog_dto_1 = require("./dto/update-blog.dto");
let BlogController = class BlogController {
    constructor(blogService) {
        this.blogService = blogService;
    }
    async getPublished(res, page, limit, search) {
        const data = await this.blogService.getPublished(page ? parseInt(page) : 1, limit ? parseInt(limit) : 10, search);
        (0, helpers_1.responseHandler)(res, {
            statusCode: http_status_1.default.OK,
            success: true,
            message: "Published posts retrieved",
            data: data.posts,
            meta: data.meta,
        });
    }
    async getBySlug(slug, res) {
        const data = await this.blogService.getBySlug(slug);
        (0, helpers_1.responseHandler)(res, {
            statusCode: http_status_1.default.OK,
            success: true,
            message: "Post retrieved",
            data,
        });
    }
    async getAll(res, page, limit) {
        const data = await this.blogService.getAll(page ? parseInt(page) : 1, limit ? parseInt(limit) : 20);
        (0, helpers_1.responseHandler)(res, {
            statusCode: http_status_1.default.OK,
            success: true,
            message: "Posts retrieved",
            data: data.posts,
            meta: data.meta,
        });
    }
    async getById(id, res) {
        const data = await this.blogService.getById(id);
        (0, helpers_1.responseHandler)(res, {
            statusCode: http_status_1.default.OK,
            success: true,
            message: "Post retrieved",
            data,
        });
    }
    async create(dto, req, res) {
        const data = await this.blogService.create(dto, req.user.id);
        (0, helpers_1.responseHandler)(res, {
            statusCode: http_status_1.default.CREATED,
            success: true,
            message: "Post created successfully",
            data,
        });
    }
    async update(id, dto, res) {
        const data = await this.blogService.update(id, dto);
        (0, helpers_1.responseHandler)(res, {
            statusCode: http_status_1.default.OK,
            success: true,
            message: "Post updated successfully",
            data,
        });
    }
    async togglePublish(id, res) {
        const data = await this.blogService.togglePublish(id);
        (0, helpers_1.responseHandler)(res, {
            statusCode: http_status_1.default.OK,
            success: true,
            message: `Post ${data.isPublished ? "published" : "unpublished"}`,
            data,
        });
    }
    async delete(id, res) {
        const data = await this.blogService.delete(id);
        (0, helpers_1.responseHandler)(res, {
            statusCode: http_status_1.default.OK,
            success: true,
            message: data.message,
            data,
        });
    }
};
exports.BlogController = BlogController;
__decorate([
    (0, public_decorator_1.Public)(),
    (0, common_1.Get)("public"),
    __param(0, (0, common_1.Res)()),
    __param(1, (0, common_1.Query)("page")),
    __param(2, (0, common_1.Query)("limit")),
    __param(3, (0, common_1.Query)("search")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, String, String]),
    __metadata("design:returntype", Promise)
], BlogController.prototype, "getPublished", null);
__decorate([
    (0, public_decorator_1.Public)(),
    (0, common_1.Get)("public/:slug"),
    __param(0, (0, common_1.Param)("slug")),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], BlogController.prototype, "getBySlug", null);
__decorate([
    (0, roles_decorator_1.Roles)(roles_decorator_1.Role.ADMIN, roles_decorator_1.Role.OWNER),
    (0, common_1.Get)(),
    __param(0, (0, common_1.Res)()),
    __param(1, (0, common_1.Query)("page")),
    __param(2, (0, common_1.Query)("limit")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, String]),
    __metadata("design:returntype", Promise)
], BlogController.prototype, "getAll", null);
__decorate([
    (0, roles_decorator_1.Roles)(roles_decorator_1.Role.ADMIN, roles_decorator_1.Role.OWNER),
    (0, common_1.Get)(":id"),
    __param(0, (0, common_1.Param)("id")),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], BlogController.prototype, "getById", null);
__decorate([
    (0, roles_decorator_1.Roles)(roles_decorator_1.Role.ADMIN, roles_decorator_1.Role.OWNER),
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Req)()),
    __param(2, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_blog_dto_1.CreateBlogDto, Object, Object]),
    __metadata("design:returntype", Promise)
], BlogController.prototype, "create", null);
__decorate([
    (0, roles_decorator_1.Roles)(roles_decorator_1.Role.ADMIN, roles_decorator_1.Role.OWNER),
    (0, common_1.Put)(":id"),
    __param(0, (0, common_1.Param)("id")),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_blog_dto_1.UpdateBlogDto, Object]),
    __metadata("design:returntype", Promise)
], BlogController.prototype, "update", null);
__decorate([
    (0, roles_decorator_1.Roles)(roles_decorator_1.Role.ADMIN, roles_decorator_1.Role.OWNER),
    (0, common_1.Post)(":id/toggle-publish"),
    __param(0, (0, common_1.Param)("id")),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], BlogController.prototype, "togglePublish", null);
__decorate([
    (0, roles_decorator_1.Roles)(roles_decorator_1.Role.ADMIN, roles_decorator_1.Role.OWNER),
    (0, common_1.Delete)(":id"),
    __param(0, (0, common_1.Param)("id")),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], BlogController.prototype, "delete", null);
exports.BlogController = BlogController = __decorate([
    (0, common_1.Controller)("blog"),
    __metadata("design:paramtypes", [blog_service_1.BlogService])
], BlogController);
//# sourceMappingURL=blog.controller.js.map