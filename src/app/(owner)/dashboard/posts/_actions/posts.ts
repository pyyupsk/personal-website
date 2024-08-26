"use server";

import { prisma } from "@/lib/prisma";

export async function deletePost(id: string) {
    await prisma.post.delete({
        where: {
            id,
        },
    });
}
