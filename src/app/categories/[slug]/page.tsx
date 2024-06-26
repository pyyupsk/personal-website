import { author } from '@/data/author';
import { getCategories, getSortedArticles } from '@/lib/markdown';
import { commonMetaData } from '@/lib/meta';
import Link from 'next/link';
import { notFound } from 'next/navigation';

export async function generateMetadata({ params: { slug } }: { params: { slug: string } }) {
    const title = `Explore ${slug} Articles`;
    const description = `Explore insightful articles on ${slug} curated by ${author.name.en} (${author.name.jp}), a seasoned full-stack developer. Dive into practical tips and in-depth discussions on ${slug}. Enhance your skills and stay updated with the latest trends in ${slug}.`;

    return commonMetaData({ title, description });
}

export async function generateStaticParams() {
    const categories = await getCategories();
    return categories.map((category) => ({
        slug: category.name,
    }));
}

export default async function CategoryPage({ params: { slug } }: { params: { slug: string } }) {
    const articles = await getSortedArticles();

    if (!articles) {
        return notFound();
    }

    const articlesByCategory = articles.filter((article) => article.frontmatter.categories.includes(slug));

    return (
        <section className="flex flex-col gap-4">
            <h1 className="text-xl md:text-2xl font-semibold">Category: {slug}</h1>
            <ul className="flex flex-col gap-2 pl-6">
                {articlesByCategory.map((article) => (
                    <li key={article.slug} className="flex flex-col gap-1">
                        <h2 className="text-lg md:text-xl font-semibold">
                            <Link href={`/articles/${article.slug}`} prefetch={false}>
                                {article.frontmatter.title}
                            </Link>
                        </h2>
                        <time>
                            {new Date(article.frontmatter.published).toLocaleDateString('en-US', {
                                year: 'numeric',
                                month: 'long',
                                day: 'numeric',
                            })}
                        </time>
                    </li>
                ))}
            </ul>
        </section>
    );
}
