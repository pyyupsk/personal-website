'use client';

import { type Post } from '@prisma/client';

import { Pagination } from './pagination';
import { PostCard } from './post-card';

export function PostsList({
    page,
    posts,
    total,
}: {
    page: number;
    posts: Omit<Post, 'content' | 'status'>[];
    total: number;
}) {
    return (
        <article className="flex flex-col gap-3">
            {posts.map((post) => (
                <PostCard key={post.id} post={post} />
            ))}
            <Pagination className="justify-end" current={page} pages={Math.ceil(total / 5)} />
        </article>
    );
}
