import { getSortedPosts } from '@/lib/markdown';
import dayjs from 'dayjs';
import Link from 'next/link';

export default async function PostsList() {
    const posts = await getSortedPosts();

    return (
        <section className="flex flex-col gap-[1.875rem]">
            {posts.map((post) => (
                <article key={post.slug} className="space-y-4">
                    <h2 className="text-2xl font-semibold">
                        <Link href={`/posts/${post.slug}`}>{post.frontmatter.title}</Link>
                    </h2>
                    <div className="flex gap-2">
                        <time dateTime={post.frontmatter.published}>
                            {dayjs(post.frontmatter.published).format('MMMM D, YYYY')}
                        </time>
                        {post.frontmatter.categories.map((category) => (
                            <Link key={category} href={`/categories/${category}`} className="font-medium">
                                #{category}
                            </Link>
                        ))}
                    </div>
                    <p>{post.frontmatter.description || post.content}</p>
                </article>
            ))}
        </section>
    );
}
