import { buttonVariants } from '@/components/ui/button';
import { EmptyState } from '@/components/ui/empty-state';
import { Separator } from '@/components/ui/separator';
import { processMarkdown } from '@/lib/markdown';
import { commonMetaData } from '@/lib/meta';
import { openGraph } from '@/lib/open-graph';
import { prisma } from '@/server/prisma';
import { format } from 'date-fns';
import { RssIcon } from 'lucide-react';
import Link from 'next/link';
import { cache } from 'react';

import { Comments } from '../_components/comments';

type Props = {
    params: {
        slug: string;
    };
};

const getPostData = cache(async (slug: string) => {
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
});

export async function generateMetadata({ params: { slug } }: Props) {
    const post = await getPostData(slug);

    if (!post) {
        return commonMetaData({
            description:
                "The post you're looking for doesn't exist or has been moved. Explore other articles and insights on Pongsakorn Thipayanate's blog to find valuable content on programming, technology, and more.",
            image: openGraph({
                button: 'Back to Home',
                description:
                    'Oops! The page you’re looking for isn’t available. Return to the homepage for more content.',
                title: 'Page Not Found',
            }),
            title: 'Post Not Found | Pongsakorn Thipayanate',
        });
    }

    const metaData = commonMetaData({
        description: `Read '${post.title}' on Pongsakorn Thipayanate's blog. Discover insights, tutorials, and reflections on programming and technology. Published on ${format(post.publishDate, 'LLLL d, yyyy')}.`,
        image: openGraph({
            button: format(post.publishDate, 'LLLL d, yyyy'),
            description: `Read about "${post.title}" in this insightful post on programming and technology.`,
            title: 'Insights & Tutorials',
        }),
        title: `${post.title} | Pongsakorn Thipayanate's Blog`,
    });

    return metaData;
}

export default async function Page({ params }: Props) {
    const post = await getPostData(params.slug);

    if (!post) {
        return (
            <EmptyState
                description="It looks like there are no post to display right now. Check back later for updates!"
                icon={RssIcon}
                title="No Post Yet"
            >
                <Link className={buttonVariants({ variant: 'outline' })} href="/posts/1">
                    Explore Posts
                </Link>
            </EmptyState>
        );
    }

    const html = await processMarkdown(post.content);
    const readingTime = Math.ceil(html.split(' ').length / 150);

    return (
        <section className="space-y-6">
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
            <Separator />
            <Comments postId={post.id} />
        </section>
    );
}
