import { Separator } from '@/components/ui/separator';
import { processMarkdown } from '@/lib/markdown';
import { prisma } from '@/server/prisma';
import { type Post } from '@prisma/client';
import { format } from 'date-fns';
import { redirect } from 'next/navigation';

export async function PostContent({ postId }: { postId: Post['id'] }) {
    const post = await prisma.post.findUnique({
        select: {
            content: true,
            description: true,
            id: true,
            publishDate: true,
            title: true,
        },
        where: { id: postId },
    });

    if (!post) return redirect('/not-found');

    const html = await processMarkdown(post.content);
    const readingTime = Math.ceil(html.split(' ').length / 150);

    return (
        <>
            <div className="flex justify-between">
                <time className="text-sm text-muted-foreground">
                    Published on {format(post.publishDate, 'LLLL d, yyyy')}
                </time>
                <span className="text-sm text-muted-foreground">{readingTime} min read</span>
            </div>
            <article className="prose max-w-none dark:prose-invert">
                <h1>{post.title}</h1>
                {post.description && <p>{post.description}</p>}
                <Separator />
                <div dangerouslySetInnerHTML={{ __html: html }} />
            </article>
        </>
    );
}
