import { getCategoryList } from '@/lib/markdown';
import Link from 'next/link';

export default async function CategoriesPage() {
    const categoryData = await getCategoryList();

    return (
        <section className="flex flex-col gap-4">
            <h2 className="text-2xl font-bold">Categories</h2>
            <ul className="flex flex-col gap-2 pl-6">
                {categoryData.map(({ name, count }) => (
                    <li key={name} className="flex flex-col gap-1">
                        <Link href={`/categories/${name}`} className="text-xl font-semibold">
                            {name}
                        </Link>
                        <p>{count} posts</p>
                    </li>
                ))}
            </ul>
        </section>
    );
}
