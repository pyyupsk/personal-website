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
        select: { publishDate: true, title: true },
        where: { id: slug },
    });

    if (!post) {
        return commonMetaData({
            description:
                "The post you're looking for doesn't exist or has been moved. Explore other articles and insights on Pongsakorn Thipayanate's blog to find valuable content on programming, technology, and more.",
            title: 'Post Not Found | Pongsakorn Thipayanate',
        });
    }

    const metaData = commonMetaData({
        description: `Read '${post.title}' on Pongsakorn Thipayanate's blog. Discover insights, tutorials, and reflections on programming and technology. Published on ${post.publishDate}.`,
        title: `${post.title} | Pongsakorn Thipayanate's Blog`,
    });

    return metaData;
}

export default async function Page({ params }: Props) {
    return (
        <section className="space-y-6">
            <Suspense fallback={<PostContentSkeleton />}>
                <PostContent postId={params.slug} />
            </Suspense>
            <Separator />
            <Comment postId={params.slug} />
        </section>
    );
}
