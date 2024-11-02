import { commonMetaData } from '@/lib/meta';
import { openGraph } from '@/lib/open-graph';
import { type Metadata } from 'next/dist/lib/metadata/types/metadata-interface';

import { PostContent } from '../_components/post-content';

type Props = {
    params: Promise<{ slug: string }>;
};

export const metadata: Metadata = commonMetaData({
    description:
        'Explore insightful posts on our blog covering various topics. Stay updated with the latest tutorials and articles.',
    image: openGraph({
        button: 'Read More',
        description: 'Discover valuable insights and tutorials on our blog.',
        title: 'Insights & Tutorials',
    }),
    title: 'Insights & Tutorials | Blog',
});

export default async function Page({ params }: Props) {
    const { slug } = await params;

    return <PostContent slug={slug} />;
}
