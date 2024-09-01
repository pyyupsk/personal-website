import { commonMetaData } from '@/lib/meta';
import { cn } from '@/lib/utils';
import { prisma } from '@/server/prisma';
import { Suspense } from 'react';

import { PostsFeed } from '../_components/posts-feed';
import { Skeleton } from '../_components/skeleton';

export function generateMetadata() {
    const metaData = commonMetaData({
        description:
            'Explore a collection of posts with insights, tutorials, and reflections on programming and technology. Dive into articles on database choices, Next.js, and more, and follow my journey as a self-taught developer.',
        title: 'Insights and Reflections | Programming Tips, Tutorials, and Tech Musings',
    });

    return metaData;
}

export default async function Page({ params }: { params: { page: string } }) {
    const total = await prisma.post.count();

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
            <Suspense fallback={<Skeleton count={total < 5 ? total : 5} />}>
                <PostsFeed page={parseInt(params.page)} total={total} />
            </Suspense>
        </div>
    );
}
