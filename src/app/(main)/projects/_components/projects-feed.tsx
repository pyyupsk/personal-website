import { api } from '@/trpc/server';

import { ProjectsList } from './projects-list';

export async function ProjectsFeed() {
    const projects = await api.projects.list({});

    return <ProjectsList projects={projects} />;
}
