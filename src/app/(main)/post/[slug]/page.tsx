import { Separator } from '@/components/ui/separator';
import { processMarkdown } from '@/lib/markdown';
import { commonMetaData } from '@/lib/meta';
import { openGraph } from '@/lib/open-graph';
import { db, postContent, post as PostTable } from '@/server/db';
import { format } from 'date-fns';
import { eq } from 'drizzle-orm';
import { unstable_cache } from 'next/cache';
import { notFound } from 'next/navigation';

import { PostContent } from '../_components/post-content';
import { type PostData } from '../_types/PostData';

type Props = {
    params: Promise<{ slug: string }>;
};

const getPostData = unstable_cache(
    async (slug: string): Promise<PostData> => {
        try {
            const [post] = await db
                .select({
                    description: PostTable.description,
                    id: PostTable.id,
                    post_content: postContent,
                    publishDate: PostTable.publishDate,
                    title: PostTable.title,
                })
                .from(PostTable)
                .where(eq(PostTable.id, slug))
                .leftJoin(postContent, eq(postContent.postId, PostTable.id))
                .limit(1);

            return post;
        } catch (error) {
            console.error('Error fetching post:', error);
            return undefined;
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
