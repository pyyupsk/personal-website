import { getCategoryList, getSortedPosts } from '@/lib/markdown';
import dayjs from 'dayjs';
import Link from 'next/link';

export async function generateStaticParams() {
    const categories = await getCategoryList();
    return categories.map((category) => ({
        slug: category.name,
    }));
}

export default async function Post({ params }: { params: { slug: string } }) {
    const posts = await getSortedPosts();

    const postsByCategory = posts.filter((post) =>
        post.frontmatter.categories.includes(params.slug.replace('%20', ' ')),
    );

    return (
        <section className="flex flex-col gap-4">
            <h2 className="text-2xl font-bold">Category: {params.slug.replace('%20', ' ')}</h2>
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
