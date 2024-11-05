import type { Metadata } from 'next/dist/lib/metadata/types/metadata-interface';

import { commonMetaData } from '@/lib/meta';
import { openGraph } from '@/lib/open-graph';
import { api } from '@/trpc/server';

import { ProjectsFeed } from './_components/projects-feed';

export const metadata: Metadata = commonMetaData({
    description:
        'Explore a selection of my programming and web development projects, from completed tools and websites to ongoing endeavors. Each project highlights my expertise in creating cutting-edge solutions and solving complex problems.',
    image: openGraph({
        button: 'Explore My Work',
        description:
            'Discover my projects showcasing innovative solutions, from web development to automation tools.',
        title: 'Showcasing My Projects',
    }),
    title: 'Showcasing My Projects | Innovative Solutions & Web Development',
});

export default async function Page() {
    const projects = await api.projects.list();

    return <ProjectsFeed projects={projects} />;
}
