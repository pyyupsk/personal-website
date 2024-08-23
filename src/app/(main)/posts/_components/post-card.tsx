import { Post } from "@prisma/client";
import { format } from "date-fns";
import Link from "next/link";

export function PostCard({ post }: { post: Omit<Post, "content" | "status"> }) {
    return (
        <Link href={`/post/${post.id}`}>
            <h3 className="text-foreground">{post.title}</h3>
            <time className="text-sm text-muted-foreground">
                {format(post.publishDate, "LLLL d, yyyy")}
            </time>
            {post.description && <p className="mt-1.5">{post.description}</p>}
        </Link>
    );
}