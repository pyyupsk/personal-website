import { commonMetaData } from '@/lib/meta';
import { Suspense } from 'react';

import { ProjectsFeed } from './_components/projects-feed';
import { ProjectsFilter } from './_components/projects-filter';
import { Skeleton } from './_components/skeleton';

export function generateMetadata() {
    const metaData = commonMetaData({
        description:
            "Explore First's portfolio of web development projects, showcasing skills in Node.js, system architecture, and security. See how each project reflects a commitment to performance and scalability.",
        title: 'Projects by First – Innovative Web Solutions & Coding Excellence',
    });

    return metaData;
}

export default async function Page() {
    return (
        <>
            <p className="mb-6">
                I work primarily on web projects, especially those involving Node.js. I love the
                flexibility and power it gives me to build everything from the backend to the
                frontend. Below are some of the projects I’ve poured my heart into, with my personal
                website being the crown jewel—a showcase of all my skills and experiences.
            </p>
            <ProjectsFilter />
            <Suspense fallback={<Skeleton count={4} />}>
                <ProjectsFeed />
            </Suspense>
        </>
    );
}
