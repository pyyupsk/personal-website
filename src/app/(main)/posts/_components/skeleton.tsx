import { Skeleton as SkeletonComponent } from '@/components/ui/skeleton';

export function Skeleton({ count }: { count: number }) {
    return (
        <section className="space-y-3">
            {Array.from({ length: count }).map((_, index) => (
                <div key={index}>
                    <SkeletonComponent className="mb-2 h-6 w-3/4 rounded-md" />
                    <SkeletonComponent className="mb-4 h-4 w-24 rounded-md" />
                    <SkeletonComponent className="mb-4 h-4 w-full rounded-md" />
                    <SkeletonComponent className="mb-2 h-4 w-3/5 rounded-md" />
                </div>
            ))}
        </section>
    );
}
