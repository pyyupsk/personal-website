import type { Languages } from 'next/dist/lib/metadata/types/alternative-urls-types';

import { api } from '@/trpc/server';

const BASE_URL = 'https://pyyupsk.vercel.app';
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
    const total = await api.posts.total();
    const pages: number = Math.ceil(total / POSTS_PER_PAGE);

    const homePage = generatePageMetadata(BASE_URL, 'weekly');
    const projectsPage = generatePageMetadata(`${BASE_URL}/projects`, 'weekly');

    const allPosts = await generatePostsMetadata(pages);
    const allPost = await generatePostMetadata(pages);

    return [homePage, projectsPage, ...allPosts, ...allPost];
}

function generatePageMetadata(url: string, changeFrequency: Sitemap['changeFrequency']): Sitemap {
    return {
        changeFrequency,
        lastModified: new Date(),
        priority: 1.0,
        url,
    };
}

async function generatePostsMetadata(pages: number): Promise<Sitemap[]> {
    return Array.from({ length: pages }, (_, i) => {
        const page = i + 1;
        return generatePageMetadata(`${BASE_URL}/posts/${page}`, 'weekly');
    });
}

async function generatePostMetadata(pages: number): Promise<Sitemap[]> {
    const posts:
        | {
              description: null | string;
              id: string;
              publishDate: string;
              status: 'ARCHIVED' | 'DRAFT' | 'PUBLISHED';
              title: string;
          }[]
        | undefined = [];

    for (let page = 1; page <= pages; page++) {
        const data = await api.posts.list({ page, pageSize: POSTS_PER_PAGE });

        posts.push(...data);
    }

    return posts.map((post) => ({
        changeFrequency: 'daily',
        lastModified: new Date(),
        priority: 0.64,
        url: `${BASE_URL}/post/${post.id}`,
    }));
}
