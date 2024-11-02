'use client';

import type { PostData } from '../_types/PostData';

import { Pagination } from './pagination';
import { PostCard } from './post-card';

const POSTS_PER_PAGE = 5;

interface Props {
    page: number;
    posts: PostData[];
    total: number;
}

export function PostsList({ page, posts, total }: Props) {
    return (
        <section className="space-y-3">
            <ul className="divide-y">
                {posts.map((post) => (
                    <li className="py-3 first:pt-0" key={post.id}>
                        <PostCard post={post} />
                    </li>
                ))}
            </ul>
            <Pagination
                className="justify-end"
                current={page}
                pages={Math.ceil(total / POSTS_PER_PAGE)}
            />
        </section>
    );
}
