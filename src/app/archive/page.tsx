import { author } from '@/data';
import { getSortedPosts, Post } from '@/lib/markdown';
import { commonMetaData } from '@/lib/meta';
import Link from 'next/link';

export async function generateMetadata() {
    const posts = await getSortedPosts();
    const groupedPosts = groupPostsByYear(posts);

    const [firstYear, ...otherYears] = Object.keys(groupedPosts);
    const lastYear = otherYears[otherYears.length - 1];
    const isSingleYear = otherYears.length === 0;

    const title = `${firstYear}${isSingleYear ? '' : ` - ${lastYear}`} Article Archive`;
    const description = `Explore the comprehensive archive of insightful articles by ${author.name.en} (${author.name.jp}), covering topics in web development, UI/UX design, backend services, and more. Delve into practical guides, tutorials, and expert insights to enhance your skills and stay informed about the latest trends in tech.`;

    return commonMetaData({ title, description });
}

export default async function ArchiveList() {
    const sortedPosts = await getSortedPosts();
    const postsByYear = groupPostsByYear(sortedPosts);

    return Object.entries(postsByYear).map(([year, posts]) => (
        <section key={year} className="flex flex-col gap-4 mb-4">
            <h2 className="text-2xl font-bold">{year}</h2>
            <ul className="flex flex-col gap-2 pl-6">
                {posts.map((post) => (
                    <li key={post.slug} className="flex flex-col gap-1">
                        <h2 className="text-xl font-semibold">
                            <Link href={`/posts/${post.slug}`}>{post.frontmatter.title}</Link>
                        </h2>
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
    ));
}

function groupPostsByYear(posts: Post[]): Record<number, Post[]> {
    const postsByYear: Record<number, Post[]> = {};

    for (const post of posts) {
        const year = new Date(post.frontmatter.published).getFullYear();
        if (!(year in postsByYear)) {
            postsByYear[year] = [];
        }
        postsByYear[year].push(post);
    }

    return postsByYear;
}
