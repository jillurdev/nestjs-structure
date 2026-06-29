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
Object.defineProperty(exports, "__esModule", { value: true });
exports.BlogService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../database/prisma/prisma.service");
const client_1 = require("@prisma/client");
let BlogService = class BlogService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(data, createdBy) {
        const existing = await this.prisma.blogPost.findUnique({
            where: { slug: data.slug },
        });
        if (existing)
            throw new common_1.ConflictException("Slug already exists");
        return this.prisma.blogPost.create({
            data: { ...data, createdBy },
        });
    }
    async getAll(page = 1, limit = 20) {
        const skip = (page - 1) * limit;
        const [posts, total] = await this.prisma.$transaction([
            this.prisma.blogPost.findMany({
                skip,
                take: limit,
                orderBy: { createdAt: "desc" },
                select: {
                    id: true,
                    title: true,
                    slug: true,
                    excerpt: true,
                    coverImage: true,
                    tags: true,
                    isPublished: true,
                    publishedAt: true,
                    createdAt: true,
                    updatedAt: true,
                },
            }),
            this.prisma.blogPost.count(),
        ]);
        return { posts, meta: { page, limit, total } };
    }
    async getById(id) {
        const post = await this.prisma.blogPost.findUnique({
            where: { id },
        });
        if (!post)
            throw new common_1.NotFoundException("Post not found");
        return post;
    }
    async update(id, data) {
        const post = await this.prisma.blogPost.findUnique({ where: { id } });
        if (!post)
            throw new common_1.NotFoundException("Post not found");
        if (data.slug && data.slug !== post.slug) {
            const existing = await this.prisma.blogPost.findUnique({
                where: { slug: data.slug },
            });
            if (existing)
                throw new common_1.ConflictException("Slug already exists");
        }
        return this.prisma.blogPost.update({
            where: { id },
            data,
        });
    }
    async togglePublish(id) {
        const post = await this.prisma.blogPost.findUnique({ where: { id } });
        if (!post)
            throw new common_1.NotFoundException("Post not found");
        return this.prisma.blogPost.update({
            where: { id },
            data: {
                isPublished: !post.isPublished,
                publishedAt: !post.isPublished ? new Date() : null,
            },
        });
    }
    async delete(id) {
        const post = await this.prisma.blogPost.findUnique({ where: { id } });
        if (!post)
            throw new common_1.NotFoundException("Post not found");
        await this.prisma.blogPost.delete({ where: { id } });
        return { message: "Post deleted successfully" };
    }
    async getPublished(page = 1, limit = 10, search) {
        const skip = (page - 1) * limit;
        const where = {
            isPublished: true,
            ...(search && {
                OR: [
                    { title: { contains: search, mode: client_1.Prisma.QueryMode.insensitive } },
                    {
                        excerpt: { contains: search, mode: client_1.Prisma.QueryMode.insensitive },
                    },
                    { tags: { has: search } },
                ],
            }),
        };
        const [posts, total] = await this.prisma.$transaction([
            this.prisma.blogPost.findMany({
                where,
                skip,
                take: limit,
                orderBy: { publishedAt: "desc" },
                select: {
                    id: true,
                    title: true,
                    slug: true,
                    excerpt: true,
                    coverImage: true,
                    tags: true,
                    publishedAt: true,
                },
            }),
            this.prisma.blogPost.count({ where }),
        ]);
        return { posts, meta: { page, limit, total } };
    }
    async getBySlug(slug) {
        const post = await this.prisma.blogPost.findUnique({
            where: { slug, isPublished: true },
        });
        if (!post)
            throw new common_1.NotFoundException("Post not found");
        return post;
    }
};
exports.BlogService = BlogService;
exports.BlogService = BlogService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], BlogService);
//# sourceMappingURL=blog.service.js.map