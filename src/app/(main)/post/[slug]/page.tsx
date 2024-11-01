import { Separator } from '@/components/ui/separator';
import { processMarkdown } from '@/lib/markdown';
import { commonMetaData } from '@/lib/meta';
import { openGraph } from '@/lib/open-graph';
import { api } from '@/trpc/server';
import { format } from 'date-fns';

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

export default async function Page(props: Props) {
    const { slug } = await props.params;
    const { post, post_content } = (await api.posts.blog({ id: slug })) || {};

    const { html, readingTime } = await processMarkdown(post_content!.content);

    return (
        <section className="space-y-6">
            <PostContent html={html} post={post} readingTime={readingTime} />
            <Separator />
        </section>
    );
}
