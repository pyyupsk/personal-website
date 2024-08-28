import { commonMetaData } from '@/lib/meta';
import { cn } from '@/lib/utils';
import { Suspense } from 'react';

import { PostsFeed } from '../_components/posts-feed';
import { Skeleton } from '../_components/skeleton';

export function generateMetadata() {
    const metaData = commonMetaData({
        description:
            "Read First's latest blog posts on programming, reverse engineering, and personal growth. Dive into a journey of coding challenges, solutions, and knowledge-sharing.",
        title: "First's Blog – Insights & Experiences from a Dedicated Programmer",
    });

    return metaData;
}

export default async function Page({ params }: { params: { page: string } }) {
    return (
        <>
            <p className={cn('mb-6', params.page !== '1' && 'hidden')}>
                In my blog, I share insights from my journey as a self-taught programmer. Whether
                it’s a deep dive into a specific technology or a reflection on my experiences, each
                post is written to help others learn and grow alongside me. Feel free to leave your
                thoughts in the comments—I’d love to hear from you.
            </p>
            <Suspense fallback={<Skeleton count={5} />}>
                <PostsFeed page={parseInt(params.page)} />
            </Suspense>
        </>
    );
}
