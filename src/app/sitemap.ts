import { prisma } from '@/server/prisma';
import { $Enums, type Post } from '@prisma/client';
import { type Languages } from 'next/dist/lib/metadata/types/alternative-urls-types';

const BASE_URL = 'https://pyyupsk.vercel.app';

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
    const posts = await prisma.post.findMany({
        select: { id: true },
        where: { status: $Enums.PostStatus.PUBLISHED },
    });

    const homePage = generatePageMetadata(BASE_URL, 'weekly');
    const projectsPage = generatePageMetadata(`${BASE_URL}/projects`, 'weekly');

    const allPosts = generatePostsMetadata(posts);
    const allPost = generatePostMetadata(posts);

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

function generatePostsMetadata(posts: { id: Post['id'] }[]): Sitemap[] {
    const pages: number = Math.ceil(posts.length / 5);

    return Array.from({ length: pages }, (_, i) => {
        const page = i + 1;
        return generatePageMetadata(`${BASE_URL}/posts/${page}`, 'weekly');
    });
}

function generatePostMetadata(posts: { id: Post['id'] }[]): Sitemap[] {
    return posts.map(({ id }) => ({
        changeFrequency: 'daily',
        lastModified: new Date(),
        priority: 0.64,
        url: `${BASE_URL}/post/${id}`,
    }));
}
