import type { Languages } from 'next/dist/lib/metadata/types/alternative-urls-types';

import { BASE_URL } from '@/constants/base-url';
import { api } from '@/trpc/server';

const POSTS_PER_PAGE = 5;

type Sitemap = {
    alternates?: {
        languages?: Languages<string>;
    };
    changeFrequency?: 'always' | 'daily' | 'hourly' | 'monthly' | 'never' | 'weekly' | 'yearly';
    lastModified?: Date | string;
    priority?: number;
    url: string;
};

export default async function sitemap(): Promise<Sitemap[]> {
    const { pagination, posts } = await api.posts.list({ page: 1, pageSize: 50 });

    return [
        generatePageMetadata(BASE_URL, 'weekly'),
        generatePageMetadata(`${BASE_URL}/projects`, 'weekly'),
        ...Array.from({ length: Math.ceil(pagination.total / POSTS_PER_PAGE) }, (_, i) => {
            const page = i + 1;
            return generatePageMetadata(`${BASE_URL}/posts/${page}`, 'weekly');
        }),
        ...(posts.map((post) => {
            return {
                changeFrequency: 'daily',
                lastModified: new Date(),
                priority: 0.64,
                url: `${BASE_URL}/post/${post.id}`,
            };
        }) as Sitemap[]),
    ];
}

function generatePageMetadata(url: string, changeFrequency: Sitemap['changeFrequency']): Sitemap {
    return {
        changeFrequency,
        lastModified: new Date(),
        priority: 1.0,
        url,
    };
}
