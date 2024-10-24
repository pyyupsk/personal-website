import { Separator } from '@/components/ui/separator';
import { processMarkdown } from '@/lib/markdown';
import { commonMetaData } from '@/lib/meta';
import { openGraph } from '@/lib/open-graph';
import { prisma } from '@/server/prisma';
import { format } from 'date-fns';
import { unstable_cache } from 'next/cache';
import { notFound } from 'next/navigation';

import { PostContent } from '../_components/post-content';

type Props = {
    params: Promise<{ slug: string }>;
};

type PostData = {
    description: null | string;
    id: string;
    post_content: {
        content: string;
    } | null;
    publishDate: Date;
    title: string;
} | null;

const getPostData = unstable_cache(
    async (slug: string): Promise<PostData> => {
        try {
            return await prisma.post.findUnique({
                select: {
                    description: true,
                    id: true,
                    post_content: {
                        select: { content: true },
                    },
                    publishDate: true,
                    title: true,
                },
                where: { id: slug },
            });
        } catch (error) {
            console.error('Error fetching post:', error);
            return null;
        }
    },
    ['post-data'],
    {
        revalidate: 3600,
        tags: ['post-data'],
    },
);

export async function generateMetadata(props: Props) {
    const { slug } = await props.params;
    const post = await getPostData(slug);

    if (!post)
        return commonMetaData({ description: 'Post Not Found', title: 'Post Not Found | Blog' });

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

    if (!post || !post.post_content) {
        notFound();
    }

    const { html, readingTime } = await processMarkdown(post.post_content.content);

    return (
        <section className="space-y-6">
            <PostContent html={html} post={post} readingTime={readingTime} />
            <Separator />
        </section>
    );
}
