import { getCategoryList, getSortedPosts } from '@/lib/markdown';
import dayjs from 'dayjs';
import Link from 'next/link';
import { notFound } from 'next/navigation';

export async function generateMetadata({ params: { slug } }: { params: { slug: string } }) {
    const categories = await getCategoryList();
    const category = categories.find((category) => category.name === slug.replace('%20', ' '));

    if (!category) {
        return {
            title: {
                absolute: 'Category Not Found',
            },
        };
    }

    return {
        title: {
            absolute: `Category: ${category.name}`,
        },
        description: `Explore a collection of articles and tutorials within the ${category.name} category on my journey as a developer.`,
    };
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

    const postsByCategory = posts.filter((post) => post.frontmatter.categories.includes(slug.replace('%20', ' ')));

    return (
        <section className="flex flex-col gap-4">
            <h2 className="text-2xl font-bold">Category: {slug.replace('%20', ' ')}</h2>
            <ul className="flex flex-col gap-2 pl-6">
                {postsByCategory.map((post) => (
                    <li key={post.slug} className="flex flex-col gap-1">
                        <Link href={`/posts/${post.slug}`} className="text-xl font-semibold">
                            {post.frontmatter.title}
                        </Link>
                        <time>{dayjs(post.frontmatter.published).format('D MMMM YYYY')}</time>
                    </li>
                ))}
            </ul>
        </section>
    );
}
