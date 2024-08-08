import { Backward } from "@/components/backward";
import { Comment } from "@/components/post/comment";
import { buttonVariants } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { env } from "@/env";
import { processMarkdown } from "@/lib/markdown";
import { commonMetaData } from "@/lib/meta";
import { prisma } from "@/lib/prisma";
import { Posts } from "@prisma/client";
import dayjs from "dayjs";
import Link from "next/link";
import { redirect } from "next/navigation";
import { Fragment } from "react";

const prod: boolean = env.NODE_ENV === "production";

type Props = {
    params: {
        slug: string;
    };
};

export async function generateMetadata({ params: { slug } }: Props) {
    const post = prod
        ? await prisma.posts.findUnique({ where: { id: slug } })
        : { title: "In Development" };

    if (!post)
        return commonMetaData({
            title: "Post Not Found | Pongsakorn Thipayanate's Blog",
            description:
                "Sorry, the post you are looking for could not be found. Explore more insightful articles and projects by Pongsakorn Thipayanate, a full-stack developer from Samut Sakhon, Thailand. Visit the blog to discover valuable content.",
        });

    const title = `${post.title} | Insights by Pongsakorn Thipayanate`;
    const description = `Read '${post.title}' by Pongsakorn Thipayanate, a full-stack developer from Samut Sakhon, Thailand. Discover expert insights and detailed analysis on ${post.title}. Enhance your knowledge with this comprehensive guide.`;

    return commonMetaData({ title, description });
}

export default async function Page({ params }: Props) {
    const post = prod
        ? await prisma.posts.findUnique({
              where: { id: params.slug },
              select: {
                  id: true,
                  title: true,
                  description: true,
                  content: true,
                  createdAt: true,
                  viewCount: true,
              },
          })
        : ({
              id: params.slug,
              title: params.slug,
              description: "Content coming soon",
              content: "# Hello World\n\nCurrently under development.",
              createdAt: new Date(),
              viewCount: 0,
          } as Posts);

    if (!post) return redirect("/posts/1");

    const html = await processMarkdown(post.content);

    if (prod) {
        await prisma.posts.update({
            where: { id: post.id },
            data: { viewCount: { increment: 1 } },
        });
    }

    return (
        <Fragment>
            <div className="space-y-4 flex flex-col">
                <Backward href="/posts/1">Back to Posts</Backward>
                <div className="flex justify-between items-center">
                    <time className="text-sm text-muted-foreground">
                        Published on {dayjs(post.createdAt).format("MMMM DD, YYYY")}
                    </time>
                    <p className="text-sm text-muted-foreground">{post.viewCount} views</p>
                </div>
                <article className="prose dark:prose-invert max-w-none">
                    <h1>{post.title}</h1>
                    {post.description && <p>{post.description}</p>}
                    <Separator />
                    <div dangerouslySetInnerHTML={{ __html: html }} />
                </article>
                <div className="flex justify-center">
                    <Link
                        href="/posts/1"
                        className={buttonVariants({ variant: "outline", size: "sm" })}
                    >
                        See all posts
                    </Link>
                </div>
                <Comment postId={post.id} />
            </div>
        </Fragment>
    );
}
