import { Separator } from "@/components/ui/separator";
import { processMarkdown } from "@/lib/markdown";
import { commonMetaData } from "@/lib/meta";
import { prisma } from "@/lib/prisma";
import { format } from "date-fns";
import { redirect } from "next/navigation";

type Props = {
    params: {
        slug: string;
    };
};

export async function generateMetadata({ params: { slug } }: Props) {
    const post = await prisma.post.findUnique({ where: { id: slug } });

    if (!post) {
        return commonMetaData({
            title: "Page Not Found – Explore More from First",
            description:
                "Oops! It looks like the page you're looking for doesn't exist. Head back to explore other projects, blog posts, and insights from First.",
        });
    }

    const metaData = commonMetaData({
        title: `${post.title}  – Insights from First's Programming Journey`,
        description: `Read "${post.title}" by First. Discover insights, challenges, and experiences in programming. Explore this detailed blog post on https://pyyupsk.vercel.app.`,
    });

    return metaData;
}

export default async function Page({ params }: Props) {
    const post = await prisma.post.findUnique({
        where: { id: params.slug },
        select: {
            id: true,
            title: true,
            description: true,
            content: true,
            publishDate: true,
        },
    });

    if (!post) return redirect("/not-found");

    const html = await processMarkdown(post.content);
    const readingTime = Math.ceil(html.split(" ").length / 150);

    return (
        <div className="space-y-3">
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
            {/* TODO: Add comments */}
            {/* <Comment postId={post.id} /> */}
        </div>
    );
}
