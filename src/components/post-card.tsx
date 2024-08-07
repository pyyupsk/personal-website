import { Posts } from "@prisma/client";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import Link from "next/link";

dayjs.extend(relativeTime);

export function PostCard({ post }: { post: Posts }) {
    return (
        <Link
            key={post.id}
            href={`/blog/${post.id}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex justify-between items-center group"
        >
            <div className="flex flex-col gap-1">
                <p className="text-sm group-hover:underline">{post.title}</p>
                <p className="text-xs text-muted-foreground line-clamp-2">
                    {post.description ?? post.content.slice(0, 100)}
                </p>
                <div className="flex gap-2">
                    <time className="text-xs text-muted-foreground">
                        {dayjs(post.createdAt).fromNow()}
                    </time>
                    <span className="text-xs text-muted-foreground">•</span>
                    <p className="text-xs text-muted-foreground">{post.viewCount} views</p>
                </div>
            </div>
        </Link>
    );
}
