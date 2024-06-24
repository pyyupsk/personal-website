import { getCategoryList, getSortedPosts } from '@/lib/markdown';
import { MetadataRoute } from 'next';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const URL = 'https://pyyupsk.is-a.dev';

    const posts = await getSortedPosts();
    const categories = await getCategoryList();

    const allPosts = posts.map((post) => ({
        url: `${URL}/posts/${post.slug}`,
        lastModified: new Date(post.frontmatter.published),
        priority: 0.64,
        changeFrequency: 'daily',
    })) as MetadataRoute.Sitemap;

    const allCategories = categories.map((category) => ({
        url: `${URL}/categories/${category.name}`,
        lastModified: new Date(),
        priority: 0.64,
        changeFrequency: 'daily',
    })) as MetadataRoute.Sitemap;

    return [
        {
            url: `${URL}/`, // Home Page
            lastModified: new Date(),
            priority: 1.0,
            changeFrequency: 'weekly',
        },
        {
            url: `${URL}/posts`, // Posts Page
            lastModified: new Date(),
            priority: 0.8,
            changeFrequency: 'daily',
        },
        {
            url: `${URL}/archive`, // Archive Page
            lastModified: new Date(),
            priority: 0.8,
            changeFrequency: 'weekly',
        },
        {
            url: `${URL}/categories`, // Categories Page
            lastModified: new Date(),
            priority: 0.8,
            changeFrequency: 'weekly',
        },
        ...allPosts,
        ...allCategories,
    ];
}
