import { createTRPCRouter, publicProcedure } from '@/server/api/trpc';
import { post, postContent } from '@/server/db/schema';
import { count, desc, eq } from 'drizzle-orm';
import { z } from 'zod';

export const postsRouter = createTRPCRouter({
    blog: publicProcedure
        .input(
            z.object({
                id: z.string(),
            }),
        )
        .query(async ({ ctx, input }) => {
            const [res] = await ctx.db
                .select()
                .from(post)
                .where(eq(post.id, input.id))
                .leftJoin(postContent, eq(post.id, postContent.postId))
                .limit(1);

            return res;
        }),

    list: publicProcedure
        .input(
            z.object({
                page: z.number().min(1).default(1),
                pageSize: z.number().min(1).default(5),
            }),
        )
        .query(async ({ ctx, input }) => {
            const posts = await ctx.db.query.post.findMany({
                limit: input.pageSize,
                offset: (input.page - 1) * input.pageSize,
                orderBy: desc(post.publishDate),
                where: eq(post.status, 'PUBLISHED'),
            });

            return posts;
        }),

    total: publicProcedure.query(async ({ ctx }) => {
        const [total] = await ctx.db
            .select({
                count: count(),
            })
            .from(post);

        return total?.count ?? 0;
    }),
});
