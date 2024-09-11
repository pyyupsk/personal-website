import { Separator } from '@/components/ui/separator';
import { processMarkdown } from '@/lib/markdown';
import { commonMetaData } from '@/lib/meta';
import { prisma } from '@/server/prisma';
import { format } from 'date-fns';
import { redirect } from 'next/navigation';

import { Comments } from '../_components/comments';

type Props = {
    params: {
        slug: string;
    };
};

export async function generateMetadata({ params: { slug } }: Props) {
    const post = await prisma.post.findUnique({
        select: { publishDate: true, title: true },
        where: { id: slug },
    });

    if (!post) {
        return commonMetaData({
            description:
                "The post you're looking for doesn't exist or has been moved. Explore other articles and insights on Pongsakorn Thipayanate's blog to find valuable content on programming, technology, and more.",
            title: 'Post Not Found | Pongsakorn Thipayanate',
        });
    }

    const metaData = commonMetaData({
        description: `Read '${post.title}' on Pongsakorn Thipayanate's blog. Discover insights, tutorials, and reflections on programming and technology. Published on ${format(post.publishDate, 'LLLL d, yyyy')}.`,
        image: `/api/og?title=${encodeURIComponent("Ponsakorn Thipayanate's blog")}&description=${encodeURIComponent(`Read ${post.title}. Discover insights, tutorials, and reflections on programming and technology.`)}`,
        title: `${post.title} | Pongsakorn Thipayanate's Blog`,
    });

    return metaData;
}

export default async function Page({ params }: Props) {
    const post = await prisma.post.findUnique({
        select: {
            content: true,
            description: true,
            id: true,
            publishDate: true,
            title: true,
        },
        where: { id: params.slug },
    });

    if (!post) return redirect('/not-found');

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
