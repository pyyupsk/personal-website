import { Skeleton as SkeletonComponent } from '@/components/ui/skeleton';

export function Skeleton({ count }: { count: number }) {
    return (
        <section className="space-y-3">
            <ul className="divide-y">
                {Array.from({ length: count }).map((_, index) => (
                    <li className="py-3 first:pt-0" key={index}>
                        <SkeletonComponent className="mb-4 h-5 w-3/4 rounded-md" />
                        <SkeletonComponent className="h-3 w-24 rounded-md" />
                        {index % 2 === 0 && (
                            <>
                                <SkeletonComponent className="mb-2 mt-4 h-3 w-full rounded-md" />
                                <SkeletonComponent className="h-3 w-3/5 rounded-md" />
                            </>
                        )}
                    </li>
                ))}
            </ul>
        </section>
    );
}
