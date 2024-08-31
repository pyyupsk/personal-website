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
                "Oops! The page you're looking for doesn't exist. Explore the latest posts and projects by Pongsakorn Thipayanate or return to the homepage for more insights and updates.",
            title: 'Page Not Found - Pongsakorn Thipayanate',
        });
    }

    const metaData = commonMetaData({
        description: `Explore '${post.title}' by Pongsakorn Thipayanate, where he shares his personal insights and detailed analysis on programming and technology. Dive into the latest in tech and development.`,
        title: `${post.title}  – Insights from Pongsakorn Thipayanate`,
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
