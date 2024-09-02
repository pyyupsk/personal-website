import { Skeleton as SkeletonComponent } from '@/components/ui/skeleton';

export function Skeleton({ count }: { count: number }) {
    return (
        <section className="flex flex-col divide-y">
            {Array.from({ length: count }).map((_, index) => (
                <div
                    className="grid grid-cols-1 gap-3 rounded-md py-3 first:pt-0 sm:grid-cols-6"
                    key={index}
                >
                    <div className="relative sm:col-span-2">
                        <SkeletonComponent className="aspect-video rounded-md" />
                    </div>
                    <div className="sm:col-span-4">
                        <SkeletonComponent className="mb-2 h-6 w-3/4 rounded-md" />
                        <SkeletonComponent className="mb-4 h-4 w-full rounded-md" />
                        <SkeletonComponent className="mb-2 h-4 w-3/5 rounded-md" />
                    </div>
                </div>
            ))}
        </section>
    );
}
