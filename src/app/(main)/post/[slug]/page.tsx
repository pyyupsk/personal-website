import { BASE_URL } from '@/constants/base-url';
import { type BlogPosting, JsonLd, type WithContext } from '@/lib/json-ld';
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

    const description =
        post.description ||
        (post.postContent?.content
            ? (await convertMarkdownToPlainText(post.postContent.content)).slice(0, 160) + '...'
            : '');

    const jsonLd: WithContext<BlogPosting> = {
        '@context': 'https://schema.org',
        '@type': 'BlogPosting',
        author: {
            '@type': 'Person',
            name: 'P. Thipayanate',
            url: BASE_URL,
        },
        datePublished: new Date(post.publishDate).toISOString(),
        description,
        headline: post.title,
        image:
            BASE_URL +
            openGraph({
                button: formatDateVerbose(post.publishDate),
                description: description || 'No description available.',
                title: 'Insights & Tutorials',
            }),
        isAccessibleForFree: true,
        mainEntityOfPage: {
            '@id': new URL(`/post/${slug}`, BASE_URL).toString(),
            '@type': 'WebPage',
        },
    };

    return (
        <>
            <JsonLd code={jsonLd} />
            <PostContent html={html} post={post} readingTime={readingTime} />
        </>
    );
}
