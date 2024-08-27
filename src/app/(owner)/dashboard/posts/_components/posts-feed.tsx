import { prisma } from '@/server/prisma';

import { PostsList } from './posts-list';

export async function PostsFeed() {
    const posts = await prisma.post.findMany({
        select: {
            description: true,
            id: true,
            publishDate: true,
            status: true,
            title: true,
        },
    });

    return <PostsList posts={posts} />;
}
