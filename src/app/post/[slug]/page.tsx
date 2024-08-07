import { Backward } from "@/components/backward";
import { buttonVariants } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { processMarkdown } from "@/lib/markdown";
import { commonMetaData } from "@/lib/meta";
import { prisma } from "@/utils/prisma";
import dayjs from "dayjs";
import Link from "next/link";
import { notFound } from "next/navigation";

type Props = {
    params: {
        slug: string;
    };
};

export async function generateMetadata({ params: { slug } }: Props) {
    const post = await prisma.posts.findUnique({
        where: { id: slug },
        select: { title: true },
    });

    if (!post) return notFound();

    const title = `${post.title} | Insights by Pongsakorn Thipayanate`;
    const description = `Read '${post.title}' by Pongsakorn Thipayanate, a full-stack developer from Samut Sakhon, Thailand. Discover expert insights and detailed analysis on ${post.title}. Enhance your knowledge with this comprehensive guide.`;

    return commonMetaData({ title, description });
}

export default async function Page({ params }: Props) {
    const post = await prisma.posts.findUnique({
        where: { id: params.slug },
        select: { content: true, title: true, description: true, createdAt: true },
    });

    if (!post) return notFound();

    const html = await processMarkdown(post.content);

    return (
        <div className="flex flex-col my-12 container">
            <div className="my-8 space-y-4 flex flex-col">
                <Backward href="/posts/1">Back to Posts</Backward>
                <time className="text-sm text-muted-foreground">
                    Published on {dayjs(post.createdAt).format("MMMM DD, YYYY")}
                </time>
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
            </div>
        </div>
    );
}
