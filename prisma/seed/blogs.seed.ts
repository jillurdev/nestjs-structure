import { PrismaClient } from "@prisma/client";
import { blogs } from "./data/blog";

export async function seedBlogs(prisma: PrismaClient, ownerId: string) {
	const existing = await prisma.blogPost.count();

	if (existing > 0) {
		console.log("⏭️ Blogs already exist — skipping");
		return;
	}

	for (const blog of blogs) {
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

	console.log(`✅ ${blogs.length} blogs seeded`);
}
