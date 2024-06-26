import { author } from '@/data/author';
import { Article, getSortedArticles } from '@/lib/markdown';
import { commonMetaData } from '@/lib/meta';
import Link from 'next/link';

export async function generateMetadata() {
    const articles = await getSortedArticles();
    const groupedArticles = groupArticlesByYear(articles);

    const [firstYear, ...otherYears] = Object.keys(groupedArticles);
    const lastYear = otherYears[otherYears.length - 1];
    const isSingleYear = otherYears.length === 0;

    const title = `${firstYear}${isSingleYear ? '' : ` - ${lastYear}`} Article Archive`;
    const description = `Explore the comprehensive archive of insightful articles by ${author.name.en} (${author.name.jp}), covering topics in web development, UI/UX design, backend services, and more. Delve into practical guides, tutorials, and expert insights to enhance your skills and stay informed about the latest trends in tech.`;

    return commonMetaData({ title, description });
}

export default async function ArchiveList() {
    const sortedArticles = await getSortedArticles();
    const articlesByYear = groupArticlesByYear(sortedArticles);

    return Object.entries(articlesByYear).map(([year, articles]) => (
        <section key={year} className="flex flex-col gap-4 mb-4">
            <h2 className="text-xl md:text-2xl font-semibold">{year}</h2>
            <ul className="flex flex-col gap-2 pl-6">
                {articles.map((article) => (
                    <li key={article.slug} className="flex flex-col gap-1">
                        <h3 className="text-lg md:text-xl font-semibold">
                            <Link href={`/articles/${article.slug}`} prefetch={false}>
                                {article.frontmatter.title}
                            </Link>
                        </h3>
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
    ));
}

function groupArticlesByYear(articles: Article[]): Record<number, Article[]> {
    const articlesByYear: Record<number, Article[]> = {};

    for (const article of articles) {
        const year = new Date(article.frontmatter.published).getFullYear();
        if (!(year in articlesByYear)) {
            articlesByYear[year] = [];
        }
        articlesByYear[year].push(article);
    }

    return articlesByYear;
}
