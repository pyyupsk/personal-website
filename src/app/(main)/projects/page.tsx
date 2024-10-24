import { commonMetaData } from '@/lib/meta';
import { openGraph } from '@/lib/open-graph';
import { type Metadata } from 'next/dist/lib/metadata/types/metadata-interface';
import { Suspense } from 'react';

import { ProjectsFeed } from './_components/projects-feed';
import { ProjectsFilter } from './_components/projects-filter';
import { Skeleton } from './_components/skeleton';

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

export default function Page() {
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
