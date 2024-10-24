import { db, project } from '@/server/db';
import { desc } from 'drizzle-orm';

import { ProjectsList } from './projects-list';

export async function ProjectsFeed() {
    const projects = await db.select().from(project).orderBy(desc(project.id));

    return <ProjectsList projects={projects} />;
}
