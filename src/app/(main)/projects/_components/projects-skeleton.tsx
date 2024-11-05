import { Skeleton } from '@/components/ui/skeleton';

export function ProjectsSkeleton({ count }: { count: number }) {
    return (
        <>
            <section className="flex items-center justify-between gap-4">
                <Skeleton className="h-8 w-full sm:w-64" />
                <Skeleton className="h-8 w-full sm:w-40" />
            </section>
            <section className="flex flex-col gap-3">
                {Array.from({ length: count }).map((_, index) => (
                    <div
                        className="flex flex-col gap-4 rounded-md border p-3 shadow-md"
                        key={index}
                    >
                        <div className="flex items-center justify-between gap-3">
                            <Skeleton className="h-5 w-2/4 rounded-md" />
                            <Skeleton className="h-5 w-24 rounded-full" />
                        </div>
                        <div className="mt-1">
                            <Skeleton className="mb-2 h-3 w-full rounded-md" />
                            <Skeleton className="h-3 w-3/5 rounded-md" />
                        </div>
                    </div>
                ))}
            </section>
        </>
    );
}
