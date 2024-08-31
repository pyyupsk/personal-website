import { commonMetaData } from '@/lib/meta';
import { cn } from '@/lib/utils';
import { prisma } from '@/server/prisma';
import { Suspense } from 'react';

import { PostsFeed } from '../_components/posts-feed';
import { Skeleton } from '../_components/skeleton';

export function generateMetadata() {
    const metaData = commonMetaData({
        description:
            'Explore the blog of Pongsakorn Thipayanate, where he shares valuable insights and reflections from his journey as a self-taught programmer. Read posts on NoSQL vs SQL, Next.js with Prisma ORM, and more.',
        title: 'Programming Insights: Blog by Pongsakorn Thipayanate',
    });

    return metaData;
}

export default async function Page({ params }: { params: { page: string } }) {
    const total = await prisma.post.count();

    return (
        <>
            <p className={cn('mb-6', params.page !== '1' && 'hidden')}>
                In my blog, I share insights from my journey as a self-taught programmer. Whether
                it’s a deep dive into a specific technology or a reflection on my experiences, each
                post is written to help others learn and grow alongside me. Feel free to leave your
                thoughts in the comments—I’d love to hear from you.
            </p>
            <Suspense fallback={<Skeleton count={total < 5 ? total : 5} />}>
                <PostsFeed page={parseInt(params.page)} total={total} />
            </Suspense>
        </>
    );
}
