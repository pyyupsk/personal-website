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
    params: Promise<{
        slug: string;
    }>;
};

const getPostData = unstable_cache(
    async (slug: string) => {
        try {
            const post = await prisma.post.findUnique({
                select: {
                    content: true,
                    description: true,
                    id: true,
                    publishDate: true,
                    title: true,
                },
                where: { id: slug },
            });
            if (!post) throw new Error('Post not found');
            return post;
        } catch (error) {
            throw new Error(`Failed to get post data: ${error}`);
        }
    },
    ['post-data'],
    { revalidate: 3600 },
);

export async function generateMetadata(props: Props) {
    const params = await props.params;

    const { slug } = params;

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

export default async function Page(props: Props) {
    const params = await props.params;
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

    const { html, readingTime } = await processMarkdown(post.content);

    return (
        <section className="space-y-6">
            <PostContent html={html} post={post} readingTime={readingTime} />
            <Separator />
        </section>
    );
}
