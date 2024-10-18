import { commonMetaData } from '@/lib/meta';
import { openGraph } from '@/lib/open-graph';
import { cn } from '@/lib/utils';
import { type Metadata } from 'next/dist/lib/metadata/types/metadata-interface';
import { Suspense } from 'react';

import { PostsFeed } from '../_components/posts-feed';
import { Skeleton } from '../_components/skeleton';

export const metadata: Metadata = commonMetaData({
    description:
        'Explore a collection of posts with insights, tutorials, and reflections on programming and technology. Dive into articles on database choices, Next.js, and more, and follow my journey as a self-taught developer.',
    image: openGraph({
        button: 'Read More',
        description:
            'Explore tutorials, insights, and reflections on coding, technology, and my journey as a developer.',
        title: 'Insights & Reflections',
    }),
    title: 'Insights and Reflections | Programming Tips, Tutorials, and Tech Musings',
});

export default function Page({ params }: { params: { page: string } }) {
    return (
        <div className="space-y-6">
            <section className={cn('space-y-3', params.page !== '1' && 'hidden')}>
                <p className="text-xl text-foreground">Insights and Reflections</p>
                <p className="leading-relaxed">
                    Welcome to my collection of posts where I share insights, tutorials, and
                    reflections on programming, technology, and personal growth. Dive into articles
                    that explore various aspects of coding, project experiences, and my journey as a
                    self-taught developer. Whether you&apos;re looking for tips, in-depth analysis,
                    or just some tech musings, you&apos;ll find something to spark your interest
                    here.
                </p>
            </section>
            <Suspense fallback={<Skeleton count={5} />}>
                <PostsFeed page={parseInt(params.page)} />
            </Suspense>
        </div>
    );
}
