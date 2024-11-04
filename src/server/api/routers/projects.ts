import { createTRPCRouter, publicProcedure } from '@/server/api/trpc';
import { project } from '@/server/db/schema';
import { desc } from 'drizzle-orm';

export const projectsRouter = createTRPCRouter({
    list: publicProcedure.query(async ({ ctx }) => {
        const projects = await ctx.db.query.project.findMany({
            orderBy: desc(project.id),
        });

        return projects;
    }),
});
