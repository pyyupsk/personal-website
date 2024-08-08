"use server";

import { prisma } from "@/utils/prisma";
import { Comments, Posts } from "@prisma/client";

export async function comment({
    clerkId,
    postId,
    content,
}: {
    clerkId: Comments["clerkId"];
    postId: Posts["id"];
    content: Comments["content"];
}): Promise<void> {
    await prisma.comments.create({ data: { clerkId, postId, content } });
}
