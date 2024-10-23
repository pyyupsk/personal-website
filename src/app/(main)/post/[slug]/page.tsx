import { buttonVariants } from '@/components/ui/button';
import { EmptyState } from '@/components/ui/empty-state';
import { Separator } from '@/components/ui/separator';
import { processMarkdown } from '@/lib/markdown';
import { commonMetaData } from '@/lib/meta';
import { openGraph } from '@/lib/open-graph';
import { prisma } from '@/server/prisma';
import { format } from 'date-fns';
import { RssIcon } from 'lucide-react';
import { unstable_cache } from 'next/cache';
import Link from 'next/link';

import { PostContent } from '../_components/post-content';

type Props = {
    params: Promise<{ slug: string }>;
};

const getPostData = unstable_cache(
    async (slug: string) => {
        const post = await prisma.posts.findUnique({
            select: {
                content: {
                    select: { content: true },
                },
                description: true,
                id: true,
                publishDate: true,
                title: true,
            },
            where: { id: slug },
        });
        if (!post || !post.content) throw new Error('Post not found');
        return post;
    },
    ['post-data'],
    { revalidate: 3600 },
);

export async function generateMetadata(props: Props) {
    const { slug } = await props.params;
    const post = await getPostData(slug);

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

export default async function Page(props: Props) {
    const { slug } = await props.params;
    const post = await getPostData(slug);

    if (!post || !post.content) {
        return (
            <EmptyState description="No post found" icon={RssIcon} title="No Post Yet">
                <Link className={buttonVariants({ variant: 'outline' })} href="/posts/1">
                    Explore Posts
                </Link>
            </EmptyState>
        );
    }

    const { html, readingTime } = await processMarkdown(post.content.content);

    return (
        <section className="space-y-6">
            <PostContent html={html} post={post} readingTime={readingTime} />
            <Separator />
        </section>
    );
}
