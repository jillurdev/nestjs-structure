import { PrismaClient } from "@prisma/client";
export declare function seedBlogs(prisma: PrismaClient, ownerId: string): Promise<void>;
