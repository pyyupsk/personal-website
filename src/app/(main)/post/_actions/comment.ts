'use server';

import { prisma } from '@/server/prisma';

export async function createComment({
    authorId,
    content,
    postId,
}: {
    authorId: string;
    content: string;
    postId: string;
}) {
    return prisma.comment.create({ data: { authorId, content, postId } });
}
