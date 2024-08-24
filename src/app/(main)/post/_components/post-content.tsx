import { Separator } from "@/components/ui/separator";
import { processMarkdown } from "@/lib/markdown";
import { prisma } from "@/lib/prisma";
import { Post } from "@prisma/client";
import { format } from "date-fns";
import { redirect } from "next/navigation";
import { Fragment } from "react";

export async function PostContent({ postId }: { postId: Post["id"] }) {
    const post = await prisma.post.findUnique({
        where: { id: postId },
        select: {
            id: true,
            title: true,
            description: true,
            content: true,
            publishDate: true,
        },
        cacheStrategy: { ttl: 3600 },
    });

    if (!post) return redirect("/not-found");

    const html = await processMarkdown(post.content);
    const readingTime = Math.ceil(html.split(" ").length / 150);

    return (
        <Fragment>
            <div className="flex justify-between">
                <time className="text-sm text-muted-foreground">
                    Published on {format(post.publishDate, "LLLL d, yyyy")}
                </time>
                <span className="text-sm text-muted-foreground">{readingTime} min read</span>
            </div>
            <article className="prose dark:prose-invert max-w-none">
                <h1>{post.title}</h1>
                {post.description && <p>{post.description}</p>}
                <Separator />
                <div dangerouslySetInnerHTML={{ __html: html }} />
            </article>
        </Fragment>
    );
}
