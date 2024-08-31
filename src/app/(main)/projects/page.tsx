import { commonMetaData } from '@/lib/meta';
import { Suspense } from 'react';

import { ProjectsFeed } from './_components/projects-feed';
import { ProjectsFilter } from './_components/projects-filter';
import { Skeleton } from './_components/skeleton';

export function generateMetadata() {
    const metaData = commonMetaData({
        description:
            'Check out Pongsakorn Thipayanate’s web projects, including powerful Node.js applications, innovative tools, and engaging community sites. Explore completed projects like GeoThai, Safecy, and more.',
        title: 'Explore My Web Projects: From Node.js Mastery to Innovative Tools',
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
