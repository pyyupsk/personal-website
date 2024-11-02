import { buttonVariants } from '@/components/ui/button';
import { EmptyState } from '@/components/ui/empty-state';
import { api } from '@/trpc/server';
import { RssIcon } from 'lucide-react';
import { Link } from 'next-view-transitions';

import { PostsList } from './posts-list';

export async function PostsFeed({ page }: { page: number }) {
    const total = await api.posts.total();
    const posts = await api.posts.list({ page });

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
