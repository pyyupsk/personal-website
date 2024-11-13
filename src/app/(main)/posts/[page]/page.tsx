import { generateMetadata } from '@/lib/metadata';
import { openGraph } from '@/lib/open-graph';
import { cn } from '@/lib/utils';
import dynamic from 'next/dynamic';
import { Suspense } from 'react';

import { Skeleton } from '../_components/skeleton';

const PostsFeed = dynamic(() => import('../_components/posts-feed').then((mod) => mod.PostsFeed));

export const metadata = generateMetadata({
    description:
        'Dive into the first post by P. Thipayanate where he shares insights, tutorials, and reflections on programming, technology, and personal growth as a self-taught developer. Explore the journey of coding and the lessons learned along the way.',
    image: openGraph({
        button: 'Read Post',
        description:
            "P. Thipayanate's post on programming, technology, and personal growth offers valuable insights into the journey of a self-taught developer.",
        title: 'P. Thipayanate | Posts',
    }),
    title: 'P. Thipayanate | Insights and Reflections',
});

export default async function Page({ params }: { params: Promise<{ page: string }> }) {
    const { page } = await params;

    return (
        <div className="space-y-6">
            <section className={cn('space-y-3', page !== '1' && 'hidden')}>
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
                <PostsFeed page={parseInt(page)} />
            </Suspense>
        </div>
    );
}
