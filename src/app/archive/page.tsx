import { getSortedPosts, Post } from '@/lib/markdown';
import dayjs from 'dayjs';
import Link from 'next/link';

export default async function Archive() {
    const sortedPosts = await getSortedPosts();
    const postsByYear = groupPostsByYear(sortedPosts);

    return Object.entries(postsByYear).map(([year, posts]) => (
        <section key={year} className="flex flex-col gap-4">
            <h2 className="text-2xl font-bold">{year}</h2>
            <ul className="flex flex-col gap-2 pl-6">
                {posts.map((post) => (
                    <li key={post.slug} className="flex flex-col gap-1">
                        <Link href={`/posts/${post.slug}`} className="text-xl font-semibold">
                            {post.frontmatter.title}
                        </Link>
                        <time>{dayjs(post.frontmatter.published).format('D MMMM YYYY')}</time>
                    </li>
                ))}
            </ul>
        </section>
    ));
}

function groupPostsByYear(posts: Post[]): Record<number, Post[]> {
    const postsByYear: Record<number, Post[]> = {};

    for (const post of posts) {
        const year = dayjs(post.frontmatter.published).year();
        if (!(year in postsByYear)) {
            postsByYear[year] = [];
        }
        postsByYear[year].push(post);
    }

    return postsByYear;
}
