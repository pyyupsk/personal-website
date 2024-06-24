import { getCategoryList } from '@/lib/markdown';
import Link from 'next/link';

export default async function Categories() {
    const categories = await getCategoryList();

    return (
        <section className="flex flex-col gap-1">
            <h2 className="text-2xl font-bold">Categories</h2>
            <ul className="flex flex-col gap-2 pl-6">
                {categories.map((category) => (
                    <li key={category.name} className="flex flex-col gap-1">
                        <Link href={`/categories/${category.name}`} className="text-xl font-semibold">
                            {category.name}
                        </Link>
                        <p className="pl-[0.1875rem]">{category.count} posts</p>
                    </li>
                ))}
            </ul>
        </section>
    );
}
