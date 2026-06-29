import { PrismaService } from "@/database/prisma/prisma.service";
export declare class BlogService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    create(data: {
        title: string;
        content: string;
        excerpt?: string;
        slug: string;
        coverImage?: string;
        tags?: string[];
    }, createdBy: string): Promise<{
        id: string;
        title: string;
        createdBy: string;
        createdAt: Date;
        updatedAt: Date;
        content: string;
        excerpt: string | null;
        slug: string;
        coverImage: string | null;
        tags: string[];
        isPublished: boolean;
        publishedAt: Date | null;
    }>;
    getAll(page?: number, limit?: number): Promise<{
        posts: {
            id: string;
            title: string;
            createdAt: Date;
            updatedAt: Date;
            excerpt: string | null;
            slug: string;
            coverImage: string | null;
            tags: string[];
            isPublished: boolean;
            publishedAt: Date | null;
        }[];
        meta: {
            page: number;
            limit: number;
            total: number;
        };
    }>;
    getById(id: string): Promise<{
        id: string;
        title: string;
        createdBy: string;
        createdAt: Date;
        updatedAt: Date;
        content: string;
        excerpt: string | null;
        slug: string;
        coverImage: string | null;
        tags: string[];
        isPublished: boolean;
        publishedAt: Date | null;
    }>;
    update(id: string, data: {
        title?: string;
        content?: string;
        excerpt?: string;
        slug?: string;
        coverImage?: string;
        tags?: string[];
    }): Promise<{
        id: string;
        title: string;
        createdBy: string;
        createdAt: Date;
        updatedAt: Date;
        content: string;
        excerpt: string | null;
        slug: string;
        coverImage: string | null;
        tags: string[];
        isPublished: boolean;
        publishedAt: Date | null;
    }>;
    togglePublish(id: string): Promise<{
        id: string;
        title: string;
        createdBy: string;
        createdAt: Date;
        updatedAt: Date;
        content: string;
        excerpt: string | null;
        slug: string;
        coverImage: string | null;
        tags: string[];
        isPublished: boolean;
        publishedAt: Date | null;
    }>;
    delete(id: string): Promise<{
        message: string;
    }>;
    getPublished(page?: number, limit?: number, search?: string): Promise<{
        posts: {
            id: string;
            title: string;
            excerpt: string | null;
            slug: string;
            coverImage: string | null;
            tags: string[];
            publishedAt: Date | null;
        }[];
        meta: {
            page: number;
            limit: number;
            total: number;
        };
    }>;
    getBySlug(slug: string): Promise<{
        id: string;
        title: string;
        createdBy: string;
        createdAt: Date;
        updatedAt: Date;
        content: string;
        excerpt: string | null;
        slug: string;
        coverImage: string | null;
        tags: string[];
        isPublished: boolean;
        publishedAt: Date | null;
    }>;
}
