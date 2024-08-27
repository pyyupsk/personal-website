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
            <ProjectsFilter />
            <Suspense fallback={<Skeleton count={4} />}>
                <ProjectsFeed />
            </Suspense>
        </>
    );
}
