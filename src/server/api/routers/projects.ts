import { createTRPCRouter, publicProcedure } from '@/server/api/trpc';
import { project } from '@/server/db/schema';
import { asc } from 'drizzle-orm';
import { z } from 'zod';

export const projectsRouter = createTRPCRouter({
    list: publicProcedure
        .input(
            z.object({
                page: z.number().min(1).default(1),
                pageSize: z.number().min(1).default(5),
            }),
        )
        .query(async ({ ctx, input }) => {
            const projects = await ctx.db.query.project.findMany({
                limit: input.pageSize,
                offset: (input.page - 1) * input.pageSize,
                orderBy: asc(project.id),
            });

            return projects;
        }),
});
