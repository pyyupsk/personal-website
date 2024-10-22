import { buttonVariants } from '@/components/ui/button';
import { EmptyState } from '@/components/ui/empty-state';
import { Separator } from '@/components/ui/separator';
import { processMarkdown } from '@/lib/markdown';
import { commonMetaData } from '@/lib/meta';
import { openGraph } from '@/lib/open-graph';
import { prisma } from '@/server/prisma';
import { type Post } from '@prisma/client';
import { format } from 'date-fns';
import { RssIcon } from 'lucide-react';
import { unstable_cache } from 'next/cache';
import Link from 'next/link';

import { Comments } from '../_components/comments';

type Props = {
    params: {
        slug: string;
    };
};

const getPostData = unstable_cache(
    async (slug: string) => {
        return prisma.post.findUnique({
            select: {
                content: true,
                description: true,
                id: true,
                publishDate: true,
                title: true,
            },
            where: { id: slug },
        });
    },
    ['post-data'],
    { revalidate: 3600 }, // Cache for 1 hour
);

const getProcessedMarkdown = unstable_cache(
    async (content: string) => {
        const html = await processMarkdown(content);
        const readingTime = Math.ceil(html.split(' ').length / 150);
        return { html, readingTime };
    },
    ['processed-markdown'],
    { revalidate: 3600 },
);

export async function generateMetadata({ params: { slug } }: Props) {
    const post = await getPostData(slug);

    if (!post) {
        return commonMetaData({
            description: "The post you're looking for doesn't exist or has been moved.",
            image: openGraph({
                button: 'Back to Home',
                description: "Oops! The page you're looking for isn't available.",
                title: 'Page Not Found',
            }),
            title: 'Post Not Found | Blog',
        });
    }

    return commonMetaData({
        description: `Read '${post.title}' on the blog. Published on ${format(post.publishDate, 'LLLL d, yyyy')}.`,
        image: openGraph({
            button: format(post.publishDate, 'LLLL d, yyyy'),
            description: `Read about "${post.title}"`,
            title: 'Insights & Tutorials',
        }),
        title: `${post.title} | Blog`,
    });
}

function PostContent({
    html,
    post,
    readingTime,
}: {
    html: string;
    post: {
        description: Post['description'];
        id: Post['id'];
        publishDate: Post['publishDate'];
        title: Post['title'];
    };
    readingTime: number;
}) {
    return (
        <>
            <section className="space-y-1.5">
                <div className="flex justify-between">
                    <time className="text-sm text-muted-foreground">
                        Published on {format(post.publishDate, 'LLLL d, yyyy')}
                    </time>
                    <span className="text-sm text-muted-foreground">{readingTime} min read</span>
                </div>
                <div className="prose max-w-none dark:prose-invert">
                    <h1>{post.title}</h1>
                    {post.description && <p>{post.description}</p>}
                </div>
            </section>
            <Separator />
            <article
                className="prose max-w-none dark:prose-invert"
                dangerouslySetInnerHTML={{ __html: html }}
            />
        </>
    );
}

export default async function Page({ params }: Props) {
    const post = await getPostData(params.slug);

    if (!post) {
        return (
            <EmptyState description="No post found" icon={RssIcon} title="No Post Yet">
                <Link className={buttonVariants({ variant: 'outline' })} href="/posts/1">
                    Explore Posts
                </Link>
            </EmptyState>
        );
    }

    const { html, readingTime } = await getProcessedMarkdown(post.content);

    return (
        <section className="space-y-6">
            <PostContent html={html} post={post} readingTime={readingTime} />
            <Separator />
            <Comments postId={post.id} />
        </section>
    );
}
