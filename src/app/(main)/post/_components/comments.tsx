import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { auth } from '@/server/auth';
import { prisma } from '@/server/prisma';
import { formatDistanceToNow } from 'date-fns';
import { unstable_cache } from 'next/cache';

import { CommentsField } from './comments-field';

const getComments = unstable_cache(
    async (postId: string) => {
        return prisma.comment.findMany({
            orderBy: { commentDate: 'desc' },
            select: {
                author: { select: { id: true, image: true, name: true } },
                commentDate: true,
                content: true,
                id: true,
            },
            where: { postId },
        });
    },
    ['comments'],
    { revalidate: 60 }, // Cache for 1 minute since comments are more dynamic
);

export async function Comments({ postId }: { postId: string }) {
    const [session, comments] = await Promise.all([auth(), getComments(postId)]);

    return (
        <div className="mx-auto mt-8 max-w-2xl space-y-4">
            <CommentsField postId={postId} user={session?.user} />
            <div className="space-y-1.5 divide-y">
                {comments.map((comment) => (
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
    );
}
