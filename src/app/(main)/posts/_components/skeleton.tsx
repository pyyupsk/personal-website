import { Skeleton as SkeletonComponent } from '@/components/ui/skeleton';

export function Skeleton({ count }: { count: number }) {
    return (
        <section className="space-y-3">
            <ul className="space-y-3 divide-y">
                {Array.from({ length: count }).map((_, index) => (
                    <div className="pt-3 first:pt-0" key={index}>
                        <SkeletonComponent className="mb-4 h-5 w-3/4 rounded-md" />
                        <SkeletonComponent className="mb-4 h-3 w-24 rounded-md" />
                        <SkeletonComponent className="mb-2 h-3 w-full rounded-md" />
                        <SkeletonComponent className="h-3 w-3/5 rounded-md" />
                    </div>
                ))}
            </ul>
        </section>
    );
}
