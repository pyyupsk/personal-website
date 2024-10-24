import { buttonVariants } from '@/components/ui/button';
import { EmptyState } from '@/components/ui/empty-state';
import { db, post } from '@/server/db';
import { desc, eq } from 'drizzle-orm';
import { RssIcon } from 'lucide-react';
import { Link } from 'next-view-transitions';

import { PostsList } from './posts-list';

export async function PostsFeed({ page }: { page: number }) {
    const total = await db.$count(post);
    const posts = await db
        .select({
            description: post.description,
            id: post.id,
            publishDate: post.publishDate,
            title: post.title,
        })
        .from(post)
        .where(eq(post.status, 'PUBLISHED'))
        .orderBy(desc(post.publishDate))
        .limit(5)
        .offset((page - 1) * 5);

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
