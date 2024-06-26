import { author } from '@/data/author';
import { getCategoryList, getSortedPosts } from '@/lib/markdown';
import { commonMetaData } from '@/lib/meta';
import Link from 'next/link';
import { notFound } from 'next/navigation';

export async function generateMetadata({ params: { slug } }: { params: { slug: string } }) {
    const title = `Explore ${slug} Articles`;
    const description = `Explore insightful articles on ${slug} curated by ${author.name.en} (${author.name.jp}), a seasoned full-stack developer. Dive into practical tips and in-depth discussions on ${slug}. Enhance your skills and stay updated with the latest trends in ${slug}.`;

    return commonMetaData({ title, description });
}

export async function generateStaticParams() {
    const categories = await getCategoryList();
    return categories.map((category) => ({
        slug: category.name,
    }));
}

export default async function CategoryPage({ params: { slug } }: { params: { slug: string } }) {
    const posts = await getSortedPosts();

    if (!posts) {
        return notFound();
    }

    const postsByCategory = posts.filter((post) => post.frontmatter.categories.includes(slug));

    return (
        <section className="flex flex-col gap-4">
            <h2 className="text-xl md:text-2xl font-semibold">Category: {slug.replace('%20', ' ')}</h2>
            <ul className="flex flex-col gap-2 pl-6">
                {postsByCategory.map((post) => (
                    <li key={post.slug} className="flex flex-col gap-1">
                        <h3 className="text-lg md:text-xl font-semibold">
                            <Link href={`/posts/${post.slug}`}>{post.frontmatter.title}</Link>
                        </h3>
                        <time>
                            {new Date(post.frontmatter.published).toLocaleDateString('en-US', {
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
