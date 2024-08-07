import { env } from "@/env";
import { prisma } from "@/utils/prisma";
import { Posts } from "@prisma/client";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import Link from "next/link";
import { buttonVariants } from "./ui/button";
import { Separator } from "./ui/separator";

dayjs.extend(relativeTime);

const LIMIT: number = 5;

const prod = env.NODE_ENV === "production";

export async function PostsList() {
    const [posts, total] = await Promise.all([
        prod
            ? prisma.posts.findMany({ orderBy: { createdAt: "desc" }, take: LIMIT })
            : Array<Posts>(),
        prod ? prisma.posts.count() : Promise.resolve(0),
    ]);

    return (
        <div className="my-8 space-y-4">
            <h1>
                Latest Posts ({posts.length}/{total})
            </h1>
            <Separator />
            <div className="flex flex-col gap-2">
                {posts.map((post) => (
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
                                <p className="text-xs text-muted-foreground">
                                    {post.viewCount} views
                                </p>
                            </div>
                        </div>
                    </Link>
                ))}
            </div>
            {posts.length < LIMIT && (
                <div className="flex justify-end">
                    <Link
                        href="/blog"
                        className={buttonVariants({ variant: "outline", size: "sm" })}
                    >
                        View all posts
                    </Link>
                </div>
            )}
        </div>
    );
}
