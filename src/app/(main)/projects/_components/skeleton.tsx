import { Skeleton as SkeletonComponent } from '@/components/ui/skeleton';

export function Skeleton({ count }: { count: number }) {
    return (
        <section className="flex flex-col gap-3">
            {Array.from({ length: count }).map((_, index) => (
                <div className="flex flex-col gap-4 rounded-md border p-3 shadow-md" key={index}>
                    <div className="flex items-center justify-between gap-3">
                        <SkeletonComponent className="h-5 w-2/4 rounded-md" />
                        <SkeletonComponent className="h-5 w-24 rounded-full" />
                    </div>
                    <div className="mt-1">
                        <SkeletonComponent className="mb-2 h-3 w-full rounded-md" />
                        <SkeletonComponent className="h-3 w-3/5 rounded-md" />
                    </div>
                </div>
            ))}
        </section>
    );
}
