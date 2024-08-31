import { buttonVariants } from '@/components/ui/button';
import { EmptyState } from '@/components/ui/empty-state';
import { prisma } from '@/server/prisma';
import { $Enums } from '@prisma/client';
import { RssIcon } from 'lucide-react';
import Link from 'next/link';

import { PostsList } from './posts-list';

export async function PostsFeed({ page, total }: { page: number; total: number }) {
    const posts = await prisma.post.findMany({
        orderBy: {
            publishDate: 'desc',
        },
        select: {
            description: true,
            id: true,
            publishDate: true,
            title: true,
        },
        skip: (page - 1) * 5,
        take: 5,
        where: {
            status: $Enums.PostStatus.PUBLISHED,
        },
    });

    if (posts.length === 0) {
        return (
            <EmptyState
                description="It looks like there are no posts to display right now. Check back later for updates!"
                icon={RssIcon}
                title="No Posts Yet"
            >
                <Link className={buttonVariants({ variant: 'outline' })} href="/posts/1">
                    Explore Posts
                </Link>
            </EmptyState>
        );
    }

    return <PostsList page={page} posts={posts} total={total} />;
}
