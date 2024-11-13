import { convertMarkdownToPlainText, processMarkdown } from '@/lib/markdown';
import { generateMetadata as commonMetaData } from '@/lib/metadata';
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

    if (!post || post.status !== 'PUBLISHED') {
        return null;
    }

    const description =
        post.description ||
        (post.postContent?.content
            ? (await convertMarkdownToPlainText(post.postContent.content)).slice(0, 160) + '...'
            : '');
    const title = `${post.title} | P. Thipayanate's Blog`;

    const formatDate = formatDateVerbose(post.publishDate);

    return commonMetaData({
        description,
        image: openGraph({
            button: formatDate,
            description: description || 'No description available.',
            title: 'Insights & Tutorials',
        }),
        title,
    });
}

export default async function Page({ params }: Props) {
    const { slug } = await params;
    const post = await api.posts.blog({ id: slug });

    if (!post || !post.postContent) return notFound();

    const { html, readingTime } = await processMarkdown(post.postContent.content);

    return <PostContent html={html} post={post} readingTime={readingTime} />;
}
