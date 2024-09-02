import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Separator } from '@/components/ui/separator';
import { processMarkdown } from '@/lib/markdown';
import { commonMetaData } from '@/lib/meta';
import { auth } from '@/server/auth';
import { prisma } from '@/server/prisma';
import { format, formatDistanceToNow } from 'date-fns';
import { redirect } from 'next/navigation';

import { CommentField } from '../_components/comment-field';

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
        description: `Read '${post.title}' on Pongsakorn Thipayanate's blog. Discover insights, tutorials, and reflections on programming and technology. Published on ${post.publishDate}.`,
        title: `${post.title} | Pongsakorn Thipayanate's Blog`,
    });

    return metaData;
}

export default async function Page({ params }: Props) {
    const session = await auth();

    const post = await prisma.post.findUnique({
        select: {
            comments: {
                select: {
                    author: { select: { id: true, image: true, name: true } },
                    commentDate: true,
                    content: true,
                    id: true,
                },
            },
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
            <div className="mx-auto mt-8 max-w-2xl space-y-4">
                <CommentField postId={post.id} user={session?.user} />
                <div className="space-y-1.5 divide-y">
                    {post.comments.map((comment) => (
                        <div className="flex gap-3 bg-background py-3 shadow-sm" key={comment.id}>
                            <Avatar className="size-8">
                                <AvatarImage
                                    alt={comment.author.name || 'User Avatar'}
                                    src={comment.author.image || undefined}
                                />
                                <AvatarFallback>
                                    {comment.author.name?.charAt(0).toUpperCase()}
                                </AvatarFallback>
                            </Avatar>
                            <div className="flex flex-col gap-1">
                                <div className="flex items-center">
                                    <span>{comment.author.name}</span>
                                    <time className="ml-2 text-sm text-muted-foreground">
                                        {formatDistanceToNow(comment.commentDate, {
                                            addSuffix: true,
                                        })}
                                    </time>
                                </div>
                                <p className="mt-1 text-foreground">{comment.content}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
