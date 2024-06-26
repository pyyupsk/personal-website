import { BASE_URL } from '@/constants';
import { Article, Category, getCategories, getSortedArticles } from '@/lib/markdown';
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
    const articles = await getSortedArticles();
    const categories = await getCategories();

    const aboutPage = generatePageMetadata(BASE_URL, 'weekly');
    const compositionsPage = generatePageMetadata(`${BASE_URL}/songs`, 'weekly');
    const articlesPage = generatePageMetadata(`${BASE_URL}/articles`, 'daily');
    const categoriesPage = generatePageMetadata(`${BASE_URL}/categories`, 'daily');
    const archivesPage = generatePageMetadata(`${BASE_URL}/archives`, 'daily');

    const allArticles = generateArticleMetadata(articles);
    const allCategories = generateCategoryMetadata(categories);

    return [aboutPage, compositionsPage, articlesPage, archivesPage, categoriesPage, ...allArticles, ...allCategories];
}

function generatePageMetadata(url: string, changeFrequency: Sitemap['changeFrequency']): Sitemap {
    return {
        url,
        lastModified: new Date(),
        priority: 1.0,
        changeFrequency,
    };
}

function generateArticleMetadata(articles: Article[]): Sitemap[] {
    return articles.map(({ slug, frontmatter: { published } }) => ({
        url: `${BASE_URL}/articles/${slug}`,
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
