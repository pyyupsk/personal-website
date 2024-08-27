import { Separator } from '@/components/ui/separator';
import { commonMetaData } from '@/lib/meta';
import { prisma } from '@/server/prisma';
import dynamic from 'next/dynamic';
import { Suspense } from 'react';

import { PostContent } from '../_components/post-content';
import { PostContentSkeleton } from '../_components/post-skeleton';

const Comment = dynamic(() => import('../_components/comment').then((mod) => mod.Comment));

type Props = {
    params: {
        slug: string;
    };
};

export async function generateMetadata({ params: { slug } }: Props) {
    const post = await prisma.post.findUnique({
        select: { title: true },
        where: { id: slug },
    });

    if (!post) {
        return commonMetaData({
            description:
                "Oops! It looks like the page you're looking for doesn't exist. Head back to explore other projects, blog posts, and insights from First.",
            title: 'Page Not Found – Explore More from First',
        });
    }

    const metaData = commonMetaData({
        description: `Read "${post.title}" by First. Discover insights, challenges, and experiences in programming. Explore this detailed blog post on https://pyyupsk.vercel.app.`,
        title: `${post.title}  – Insights from First's Programming Journey`,
    });

    return metaData;
}

export default async function Page({ params }: Props) {
    return (
        <div className="space-y-3">
            <Suspense fallback={<PostContentSkeleton />}>
                <PostContent postId={params.slug} />
            </Suspense>
            <Separator />
            <Comment postId={params.slug} />
        </div>
    );
}
