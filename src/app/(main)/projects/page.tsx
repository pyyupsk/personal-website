import { commonMetaData } from '@/lib/meta';
import { Suspense } from 'react';

import { ProjectsFeed } from './_components/projects-feed';
import { ProjectsFilter } from './_components/projects-filter';
import { Skeleton } from './_components/skeleton';

export function generateMetadata() {
    const metaData = commonMetaData({
        description:
            'Explore a selection of my programming and web development projects, from completed tools and websites to ongoing endeavors. Each project highlights my expertise in creating cutting-edge solutions and solving complex problems.',
        image: `/api/og?title=${encodeURIComponent('My Projects | Innovative Web Solutions')}&description=${encodeURIComponent('Explore my web development projects, showcasing my expertise in creating innovative solutions and solving complex problems.')}`,
        title: 'Showcasing My Projects | Innovative Solutions & Web Development',
    });

    return metaData;
}

export default async function Page() {
    return (
        <div className="space-y-6">
            <section className="space-y-3">
                <p className="text-xl text-foreground">Showcasing My Projects</p>
                <p className="leading-relaxed">
                    Explore a selection of my work that demonstrates my expertise in programming and
                    web development. Each project reflects my dedication to building innovative
                    solutions, solving complex problems, and applying cutting-edge technologies.
                    From personal endeavors to freelance projects, these examples highlight my
                    skills and the value I bring to every challenge.
                </p>
            </section>
            <ProjectsFilter />
            <Suspense fallback={<Skeleton count={4} />}>
                <ProjectsFeed />
            </Suspense>
        </div>
    );
}
