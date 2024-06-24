import { getSortedPosts, Post } from '@/lib/markdown';
import dayjs from 'dayjs';
import Link from 'next/link';

export default async function Archive() {
    const posts = await getSortedPosts();
    const postsSortedByYear = new Map<number, Post[]>();

    posts.forEach((post) => {
        const year = dayjs(post.frontmatter.published).year();
        if (!postsSortedByYear.has(year)) {
            postsSortedByYear.set(year, []);
        }
        postsSortedByYear.get(year)!.push(post);
    });

    return (
        <section className="flex flex-col gap-4">
            {Array.from(postsSortedByYear.entries()).map(([year, posts]) => (
                <article key={year} className="flex flex-col gap-1">
                    <h2 className="text-2xl font-bold">{year}</h2>
                    <ul className="flex flex-col gap-2 pl-6">
                        {posts.map((post) => (
                            <li key={post.slug} className="flex flex-col gap-1">
                                <Link href={`/posts/${post.slug}`} className="text-xl font-semibold">
                                    {post.frontmatter.title}
                                </Link>
                                <time className="pl-[0.1875rem]">
                                    {dayjs(post.frontmatter.published).format('D MMMM YYYY')}
                                </time>
                            </li>
                        ))}
                    </ul>
                </article>
            ))}
        </section>
    );
}
