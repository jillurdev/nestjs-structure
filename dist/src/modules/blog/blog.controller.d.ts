import { BlogService } from "./blog.service";
import { Response } from "express";
import { CreateBlogDto } from "./dto/create-blog.dto";
import { UpdateBlogDto } from "./dto/update-blog.dto";
export declare class BlogController {
    private readonly blogService;
    constructor(blogService: BlogService);
    getPublished(res: Response, page?: string, limit?: string, search?: string): Promise<void>;
    getBySlug(slug: string, res: Response): Promise<void>;
    getAll(res: Response, page?: string, limit?: string): Promise<void>;
    getById(id: string, res: Response): Promise<void>;
    create(dto: CreateBlogDto, req: any, res: Response): Promise<void>;
    update(id: string, dto: UpdateBlogDto, res: Response): Promise<void>;
    togglePublish(id: string, res: Response): Promise<void>;
    delete(id: string, res: Response): Promise<void>;
}
