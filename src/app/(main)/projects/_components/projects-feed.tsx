'use client';

import { api } from '@/trpc/react';

import { ProjectsList } from './projects-list';

export function ProjectsFeed() {
    const [projects] = api.projects.list.useSuspenseQuery({});

    return <ProjectsList projects={projects} />;
}
