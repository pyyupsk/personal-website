import { generateMetadata } from '@/lib/metadata';
import { openGraph } from '@/lib/open-graph';
import { api } from '@/trpc/server';

import { ProjectsFeed } from './_components/projects-feed';

export const metadata = generateMetadata({
    description:
        'Explore the projects of P. Thipayanate, a passionate software engineer. From VR tools to web development, each project showcases innovative solutions and advanced technologies like TypeScript, Node.js, and VRChat.',
    image: openGraph({
        badge: 'Projects',
        button: 'View Projects',
        description:
            "A collection of P. Thipayanate's projects showcasing his skills in programming, web development, and VR tools.",
        title: 'P. Thipayanate | Projects',
    }),
    title: 'P. Thipayanate | My Projects',
});

export default async function Page() {
    const projects = await api.projects.list();

    return <ProjectsFeed projects={projects} />;
}
