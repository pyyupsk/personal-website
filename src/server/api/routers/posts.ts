import type { inferRouterOutputs } from '@trpc/server';

import { createTRPCRouter, publicProcedure } from '@/server/api/trpc';
import { post, postContent } from '@/server/db/schema';
import { count, desc, eq, sql } from 'drizzle-orm';
import { z } from 'zod';

export const postsRouter = createTRPCRouter({
    blog: publicProcedure
        .input(
            z.object({
                id: z.string(),
            }),
        )
        .query(async ({ ctx, input }) => {
            const query = ctx.db
                .select({
                    description: post.description,
                    id: post.id,
                    postContent: {
                        content: postContent.content,
                        id: postContent.id,
                    },
                    publishDate: post.publishDate,
                    status: post.status,
                    title: post.title,
                })
                .from(post)
                .leftJoin(postContent, eq(post.id, postContent.postId))
                .where(eq(post.id, input.id))
                .limit(1)
                .prepare('get_blog_post');

            const [result] = await query.execute();

            if (!result) return null;

            return {
                ...result,
                postContent: result.postContent ?? null,
            };
        }),

    list: publicProcedure
        .input(
            z.object({
                page: z.number().min(1).default(1),
                pageSize: z.number().min(1).max(50).default(5),
            }),
        )
        .query(async ({ ctx, input }) => {
            const query = ctx.db
                .select({
                    posts: post,
                    totalCount: sql<number>`count(*) over()`.as('total_count'),
                })
                .from(post)
                .where(eq(post.status, 'PUBLISHED'))
                .orderBy(desc(post.publishDate))
                .limit(input.pageSize)
                .offset((input.page - 1) * input.pageSize)
                .prepare('get_posts_list');

            const results = await query.execute();

            const posts = results.map(({ posts }) => posts);
            const totalCount = results[0]?.totalCount ?? 0;

            return {
                pagination: {
                    page: input.page,
                    pageCount: Math.ceil(totalCount / input.pageSize),
                    pageSize: input.pageSize,
                    total: totalCount,
                },
                posts,
            };
        }),

    total: publicProcedure.query(async ({ ctx }) => {
        const query = ctx.db
            .select({
                count: count(),
            })
            .from(post)
            .where(eq(post.status, 'PUBLISHED'))
            .prepare('get_posts_count');

        const [result] = await query.execute();
        return result?.count ?? 0;
    }),
});

export type ListOutput = PostsRouter['list'];

export type PostOutput = ListOutput['posts'][number];
type PostsRouter = inferRouterOutputs<typeof postsRouter>;
