import type { ListOutput } from '@/server/api/routers/posts';

import { Pagination } from './pagination';
import { PostCard } from './post-card';

export function PostsList({ pagination, posts }: ListOutput) {
    return (
        <section className="space-y-3">
            <ul className="divide-y">
                {posts.map((post) => (
                    <li className="py-3 first:pt-0" key={post.id}>
                        <PostCard post={post} />
                    </li>
                ))}
            </ul>
            {pagination.total > pagination.pageSize && (
                <Pagination
                    className="justify-end"
                    current={pagination.page}
                    pages={pagination.pageCount}
                />
            )}
        </section>
    );
}
