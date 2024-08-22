"use client";

import { Post } from "@prisma/client";
import { Pagination } from "./pagination";
import { PostCard } from "./post-card";

export function PostsList({
    posts,
    page,
    total,
}: {
    posts: Omit<Post, "content" | "status">[];
    page: number;
    total: number;
}) {
    return (
        <div className="flex flex-col gap-3">
            {posts.map((post) => (
                <PostCard key={post.id} post={post} />
            ))}
            <Pagination current={page} pages={Math.ceil(total / 5)} />
        </div>
    );
}
