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
        <section className="space-y-3">
            <ul className="space-y-3 divide-y">
                {posts.map((post) => (
                    <li key={post.id}>
                        <PostCard post={post} />
                    </li>
                ))}
            </ul>
            <Pagination className="justify-end" current={page} pages={Math.ceil(total / 5)} />
        </section>
    );
}
