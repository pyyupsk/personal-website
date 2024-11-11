import { processMarkdown } from '@/lib/markdown';
import { commonMetaData } from '@/lib/meta';
import { openGraph } from '@/lib/open-graph';
import { api } from '@/trpc/server';
import { formatDateVerbose } from '@/utils/date-time';
import { notFound } from 'next/navigation';

import { PostContent } from '../_components/post-content';

type Props = {
    params: Promise<{ slug: string }>;
};

export async function generateMetadata(props: Props) {
    const { slug } = await props.params;
    const post = await api.posts.blog({ id: slug });

    if (!post)
        return commonMetaData({ description: 'Post Not Found', title: 'Post Not Found | Blog' });

    const formatDate = formatDateVerbose(post.publishDate);

    return commonMetaData({
        description: `Read '${post.title}' on the blog. Published on ${formatDate}.`,
        image: openGraph({
            button: formatDate,
            description: `Read about "${post.title}"`,
            title: 'Insights & Tutorials',
        }),
        title: `${post.title} | Blog`,
    });
}

export default async function Page({ params }: Props) {
    const { slug } = await params;
    const post = await api.posts.blog({ id: slug });

    if (!post || !post.postContent) return notFound();

    const { html, readingTime } = await processMarkdown(post.postContent.content);

    return <PostContent html={html} post={post} readingTime={readingTime} />;
}
