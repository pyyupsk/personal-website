import { getArticleBySlug, getSlugs } from '@/lib/markdown';
import { commonMetaData } from '@/lib/meta';
import Link from 'next/link';
import { notFound } from 'next/navigation';

export async function generateMetadata({ params: { slug } }: { params: { slug: string } }) {
    const article = await getArticleBySlug(slug);

    if (!article) {
        return {
            title: 'Not Found',
        };
    }

    const { content, frontmatter } = article;

    const title = frontmatter.title;
    const description = frontmatter.description || content.substring(0, 100);

    return commonMetaData({ title, description });
}

export async function generateStaticParams() {
    const slugs = await getSlugs();
    return slugs.map((slug) => ({ slug }));
}

export default async function ArticlePage({ params: { slug } }: { params: { slug: string } }) {
    const article = await getArticleBySlug(slug);

    if (!article) {
        return notFound();
    }

    const { title, published, categories, description } = article.frontmatter;

    return (
        <section className="flex flex-col gap-4">
            <article>
                <header className="flex flex-col gap-4 pb-4 border-b border-foreground border-dashed">
                    <h1 className="text-3xl md:text-4xl font-bold">{title}</h1>
                    <div className="flex flex-col md:flex-row gap-2">
                        <span>
                            Published at{' '}
                            <time>
                                {new Date(published).toLocaleDateString('en-US', {
                                    year: 'numeric',
                                    month: 'long',
                                    day: 'numeric',
                                })}
                            </time>
                        </span>
                        <div className="flex flex-wrap gap-2">
                            {categories.map((category) => (
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
                    </div>
                    {description && <p>{description}</p>}
                </header>
                <div
                    dangerouslySetInnerHTML={{ __html: article.content }}
                    className="prose dark:prose-invert max-w-[46rem] mt-4"
                />
            </article>
        </section>
    );
}
