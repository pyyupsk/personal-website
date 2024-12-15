import type { inferRouterOutputs } from '@trpc/server';

import { createTRPCRouter, publicProcedure } from '@/server/api/trpc';
import { project } from '@/server/db/schema';
import { desc } from 'drizzle-orm';

export const projectsRouter = createTRPCRouter({
    list: publicProcedure.query(async ({ ctx }) => {
        const query = ctx.db
            .select({
                description: project.description,
                id: project.id,
                link: project.link,
                status: project.status,
                title: project.title,
            })
            .from(project)
            .orderBy(desc(project.id))
            .prepare('get_projects_list');

        const projects = await query.execute();

        return projects.map((p) => ({
            description: p.description,
            id: p.id,
            link: p.link,
            status: p.status,
            title: p.title,
        }));
    }),
});

export type ListOutput = ProjectsRouter['list'];

type ProjectsRouter = inferRouterOutputs<typeof projectsRouter>;
