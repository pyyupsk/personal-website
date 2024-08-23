"use server";

import { prisma } from "@/lib/prisma";

export async function createComment({
    postId,
    content,
    authorId,
}: {
    postId: string;
    content: string;
    authorId: string;
}) {
    return prisma.comment.create({ data: { postId, content, authorId } });
}
