import { getPostBySlug, getSlugs } from '@/lib/markdown';
import dayjs from 'dayjs';
import Link from 'next/link';
import { notFound } from 'next/navigation';

export async function generateStaticParams() {
    const slugs = await getSlugs();
    return slugs.map((slug) => ({ slug }));
}

export default async function Post({ params }: { params: { slug: string } }) {
    const post = await getPostBySlug(params.slug);

    if (!post) {
        return notFound();
    }

    return (
        <section className="flex flex-col gap-[1.875rem]">
            <article key={post.slug} className="prose dark:prose-invert max-w-none">
                <header>
                    <h2 className="text-3xl font-bold">{post.frontmatter.title}</h2>
                    <div className="mt-4 text-md">
                        <span>Posted at</span> <time>{dayjs(post.frontmatter.published).format('MMMM D, YYYY')}</time>
                        {post.frontmatter.categories.map((category) => (
                            <Link key={category} href={`/categories/${category}`} className="ml-4 font-semibold">
                                #{category}
                            </Link>
                        ))}
                    </div>
                </header>
                {post.frontmatter.description && <p className="line-clamp-4 mt-4">{post.frontmatter.description}</p>}
                <div dangerouslySetInnerHTML={{ __html: post.content }} />
            </article>
        </section>
    );
}
