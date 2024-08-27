'use server';

import { prisma } from '@/server/prisma';

export async function deletePost(id: string) {
    await prisma.post.delete({
        where: {
            id,
        },
    });
}
