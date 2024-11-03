import { processMarkdown } from '@/lib/markdown';
import { commonMetaData } from '@/lib/meta';
import { openGraph } from '@/lib/open-graph';
import { api } from '@/trpc/server';
import { format } from 'date-fns';
import { notFound } from 'next/navigation';

import { PostContent } from '../_components/post-content';

type Props = {
    params: Promise<{ slug: string }>;
};

export async function generateMetadata(props: Props) {
    const { slug } = await props.params;
    const { post } = (await api.posts.blog({ id: slug })) || {};

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

export default async function Page({ params }: Props) {
    const { slug } = await params;
    const res = await api.posts.blog({ id: slug });
    const { post, post_content } = res || {};

    if (!post || !post_content) return notFound();

    const { html, readingTime } = await processMarkdown(post_content.content);

    return <PostContent html={html} post={post} readingTime={readingTime} />;
}
