import { prisma } from "@/lib/prisma";
import { $Enums } from "@prisma/client";
import { PostsList } from "./posts-list";

export async function PostsFeed({ page }: { page: number }) {
    const total = await prisma.post.count();
    const posts = await prisma.post.findMany({
        where: {
            status: $Enums.PostStatus.PUBLISHED,
        },
        take: 5,
        skip: (page - 1) * 5,
        orderBy: {
            publishDate: "desc",
        },
        select: {
            id: true,
            title: true,
            description: true,
            publishDate: true,
        },
    });

    return <PostsList posts={posts} page={page} total={total} />;
}
