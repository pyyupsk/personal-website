import { prisma } from '@/lib/prisma';
import { PostsList } from './posts-list';

export async function PostsFeed() {
    const posts = await prisma.post.findMany({
        select: {
            id: true,
            title: true,
            description: true,
            status: true,
            publishDate: true,
        },
    });

    return <PostsList posts={posts} />;
}
