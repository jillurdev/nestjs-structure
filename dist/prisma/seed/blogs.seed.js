"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.seedBlogs = seedBlogs;
const blog_1 = require("./data/blog");
async function seedBlogs(prisma, ownerId) {
    const existing = await prisma.blogPost.count();
    if (existing > 0) {
        console.log("⏭️ Blogs already exist — skipping");
        return;
    }
    for (const blog of blog_1.blogs) {
        await prisma.blogPost.create({
            data: {
                title: blog.title,
                slug: blog.slug,
                excerpt: blog.excerpt,
                content: blog.content,
                tags: blog.tags,
                isPublished: true,
                publishedAt: new Date(),
                createdBy: ownerId,
            },
        });
    }
    console.log(`✅ ${blog_1.blogs.length} blogs seeded`);
}
//# sourceMappingURL=blogs.seed.js.map