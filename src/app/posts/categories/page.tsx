import { author } from '@/data/author';
import { getCategoryList } from '@/lib/markdown';
import { commonMetaData } from '@/lib/meta';
import Link from 'next/link';

export async function generateMetadata() {
    const title = 'Explore Categories';
    const description = `Discover a diverse range of topics in tech and development curated by ${author.name.en} (${author.name.jp}), a seasoned full-stack developer. Explore articles on web development, UI/UX design, backend services, and more. Gain insights and practical knowledge to advance your skills and projects.`;

    return commonMetaData({ title, description });
}

export default async function CategoriesList() {
    const categoryData = await getCategoryList();

    return (
        <section className="flex flex-col gap-4">
            <h2 className="text-xl md:text-2xl font-semibold">Categories</h2>
            <ul className="flex flex-col gap-2 pl-6">
                {categoryData.map(({ name, count }) => (
                    <li key={name} className="flex flex-col gap-1">
                        <h3 className="text-lg md:text-xl font-semibold">
                            <Link href={`/posts/categories/${name}`} prefetch={false}>
                                {name}
                            </Link>
                        </h3>
                        <p>{count} posts</p>
                    </li>
                ))}
            </ul>
        </section>
    );
}
