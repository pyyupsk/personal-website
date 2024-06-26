import { author } from '@/data/author';
import { getSortedArticles } from '@/lib/markdown';
import { commonMetaData } from '@/lib/meta';
import Link from 'next/link';

export async function generateMetadata() {
    const title = 'Latest Articles & Tutorials';
    const description = `Explore insightful articles by ${author.name.en} (${author.name.jp}), a skilled full-stack developer passionate about web development and innovative tech solutions dive into actionable tips and techniques for enhancing your development workflow and building efficient web applications.`;

    return commonMetaData({ title, description });
}

export default async function ArticlesList() {
    const articles = await getSortedArticles();

    return (
        <section className="flex flex-col gap-[1.875rem]">
            {articles.map((article) => (
                <article key={article.slug} className="space-y-4">
                    <h2 className="text-xl md:text-2xl font-semibold">
                        <Link href={`/articles/${article.slug}`} prefetch={false}>
                            {article.frontmatter.title}
                        </Link>
                    </h2>
                    <div className="flex gap-2 flex-wrap">
                        <time>
                            {new Date(article.frontmatter.published).toLocaleDateString('en-US', {
                                year: 'numeric',
                                month: 'long',
                                day: 'numeric',
                            })}
                        </time>
                        {article.frontmatter.categories.map((category) => (
                            <Link
                                key={category}
                                href={`/categories/${category}`}
                                prefetch={false}
                                className="font-medium"
                            >
                                #{category}
                            </Link>
                        ))}
                    </div>
                    <p className="line-clamp-3">{article.frontmatter.description || article.content}</p>
                </article>
            ))}
        </section>
    );
}
