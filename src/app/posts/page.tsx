import { getSortedPosts } from '@/lib/markdown';
import dayjs from 'dayjs';
import Link from 'next/link';

export default async function Posts() {
    const posts = await getSortedPosts();

    return (
        <section className="flex flex-col gap-[1.875rem]">
            {posts.map((post) => (
                <article key={post.slug}>
                    <header className="flex flex-col gap-4">
                        <h2 className="text-2xl font-semibold">
                            <Link href={`/posts/${post.slug}`}>{post.frontmatter.title}</Link>
                        </h2>
                        <div className="text-md pl-[0.1875rem]">
                            <span>Posted at</span>{' '}
                            <time>{dayjs(post.frontmatter.published).format('MMMM D, YYYY')}</time>
                            {post.frontmatter.categories.map((category) => (
                                <Link key={category} href={`/categories/${category}`} className="ml-4 font-semibold">
                                    #{category}
                                </Link>
                            ))}
                        </div>
                    </header>
                    <p className="line-clamp-4 mt-4 pl-[0.1875rem]">{post.frontmatter.description || post.content}</p>
                </article>
            ))}
        </section>
    );
}
