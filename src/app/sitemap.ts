import { BASE_URL } from '@/constants';
import { Category, getCategoryList, getSortedPosts, Post } from '@/lib/markdown';
import { Languages } from 'next/dist/lib/metadata/types/alternative-urls-types';

type Sitemap = {
    url: string;
    lastModified?: string | Date;
    changeFrequency?: 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never';
    priority?: number;
    alternates?: {
        languages?: Languages<string>;
    };
};

export default async function sitemap(): Promise<Sitemap[]> {
    const posts = await getSortedPosts();
    const categories = await getCategoryList();

    const homePage = generatePageMetadata(BASE_URL, 'weekly');
    const postsPage = generatePageMetadata(`${BASE_URL}/posts`, 'daily');
    const archivePage = generatePageMetadata(`${BASE_URL}/archive`, 'weekly');
    const categoriesPage = generatePageMetadata(`${BASE_URL}/categories`, 'weekly');

    const allPosts = generatePostMetadata(posts);
    const allCategories = generateCategoryMetadata(categories);

    return [homePage, postsPage, archivePage, categoriesPage, ...allPosts, ...allCategories];
}

function generatePageMetadata(url: string, changeFrequency: Sitemap['changeFrequency']): Sitemap {
    return {
        url,
        lastModified: new Date(),
        priority: 1.0,
        changeFrequency,
    };
}

function generatePostMetadata(posts: Post[]): Sitemap[] {
    return posts.map(({ slug, frontmatter: { published } }) => ({
        url: `${BASE_URL}/posts/${slug}`,
        lastModified: new Date(published),
        priority: 0.64,
        changeFrequency: 'daily',
    }));
}

function generateCategoryMetadata(categories: Category[]): Sitemap[] {
    return categories.map(({ name }) => ({
        url: `${BASE_URL}/categories/${name}`,
        lastModified: new Date(),
        priority: 0.64,
        changeFrequency: 'daily',
    }));
}
