import { getPostBySlug, getSlugs } from '@/lib/markdown';
import { commonMetaData } from '@/lib/meta';
import dayjs from 'dayjs';
import Link from 'next/link';
import { notFound } from 'next/navigation';

export async function generateMetadata({ params: { slug } }: { params: { slug: string } }) {
    const post = await getPostBySlug(slug);

    if (!post) {
        return {
            title: {
                absolute: 'Not Found',
            },
        };
    }

    const { content, frontmatter } = post;

    const metaData = commonMetaData({
        title: {
            absolute: frontmatter.title,
        },
        description: frontmatter.description || content.substring(0, 100),
    });

    return metaData;
}

export async function generateStaticParams() {
    const slugs = await getSlugs();
    return slugs.map((slug) => ({ slug }));
}

export default async function PostPage({ params: { slug } }: { params: { slug: string } }) {
    const post = await getPostBySlug(slug);

    if (!post) {
        return notFound();
    }

    const { title, published, categories, description } = post.frontmatter;

    return (
        <section className="flex flex-col gap-4">
            <article key={slug} className="prose dark:prose-invert max-w-none">
                <header>
                    <h2 className="text-3xl font-bold">{title}</h2>
                    <div className="flex gap-2">
                        <span>
                            Posted at <time>{dayjs(published).format('MMMM D, YYYY')}</time>{' '}
                        </span>
                        {categories.map((category) => (
                            <Link key={category} href={`/categories/${category}`} className="font-medium">
                                #{category}
                            </Link>
                        ))}
                    </div>
                </header>
                {description && <p>{description}</p>}
                <div dangerouslySetInnerHTML={{ __html: post.content }} />
            </article>
        </section>
    );
}
