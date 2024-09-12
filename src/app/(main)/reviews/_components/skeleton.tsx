import { Skeleton as SkeletonComponent } from '@/components/ui/skeleton';

export function Skeleton({ count }: { count: number }) {
    return (
        <section className="flex flex-col gap-3">
            {Array.from({ length: count }).map((_, index) => (
                <div className="flex flex-col gap-3 rounded-md border p-3 shadow-md" key={index}>
                    <div className="flex items-center gap-3">
                        <SkeletonComponent className="size-10 rounded-full" />
                        <div className="flex flex-col">
                            <SkeletonComponent className="mb-2 h-4 w-16 rounded-md" />
                            <SkeletonComponent className="h-3 w-24 rounded-md" />
                        </div>
                    </div>
                    <div>
                        <SkeletonComponent className="mb-2 h-3 w-full rounded-md" />
                        <SkeletonComponent className="h-3 w-3/5 rounded-md" />
                    </div>
                </div>
            ))}
        </section>
    );
}
