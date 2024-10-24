import { db, post } from '@/server/db';
import { eq } from 'drizzle-orm';
import { type Languages } from 'next/dist/lib/metadata/types/alternative-urls-types';

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
    const posts = await db.select({ id: post.id }).from(post).where(eq(post.status, 'PUBLISHED'));

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

function generatePostsMetadata(posts: { id: string }[]): Sitemap[] {
    const pages: number = Math.ceil(posts.length / POSTS_PER_PAGE);

    return Array.from({ length: pages }, (_, i) => {
        const page = i + 1;
        return generatePageMetadata(`${BASE_URL}/posts/${page}`, 'weekly');
    });
}

function generatePostMetadata(posts: { id: string }[]): Sitemap[] {
    return posts.map(({ id }) => ({
        changeFrequency: 'daily',
        lastModified: new Date(),
        priority: 0.64,
        url: `${BASE_URL}/post/${id}`,
    }));
}
