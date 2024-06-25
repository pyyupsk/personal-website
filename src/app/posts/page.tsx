import { author } from '@/data';
import { getSortedPosts } from '@/lib/markdown';
import { commonMetaData } from '@/lib/meta';
import Link from 'next/link';

export async function generateMetadata() {
    const title = 'Latest Articles and Posts';
    const description = `Explore insightful articles by ${author.name.en} (${author.name.jp}), a skilled full-stack developer passionate about web development and innovative tech solutions dive into actionable tips and techniques for enhancing your development workflow and building efficient web applications.`;

    return commonMetaData({ title, description });
}

export default async function PostsList() {
    const posts = await getSortedPosts();

    return (
        <section className="flex flex-col gap-[1.875rem]">
            {posts.map((post) => (
                <article key={post.slug} className="space-y-4">
                    <h2 className="text-xl font-semibold">
                        <Link href={`/posts/${post.slug}`}>{post.frontmatter.title}</Link>
                    </h2>
                    <div className="flex gap-2 flex-wrap">
                        <time dateTime={post.frontmatter.published}>
                            {new Date(post.frontmatter.published).toLocaleDateString('en-US', {
                                year: 'numeric',
                                month: 'long',
                                day: 'numeric',
                            })}
                        </time>
                        {post.frontmatter.categories.map((category) => (
                            <Link key={category} href={`/categories/${category}`} className="font-medium">
                                #{category}
                            </Link>
                        ))}
                    </div>
                    <p className="line-clamp-3">{post.frontmatter.description || post.content}</p>
                </article>
            ))}
        </section>
    );
}
