import { Skeleton } from '@/components/ui/skeleton';

export function PostContentSkeleton() {
    return (
        <section className="space-y-3">
            <div className="flex justify-between">
                <Skeleton className="h-4 w-48" />
                <Skeleton className="h-4 w-24" />
            </div>
            <div>
                <Skeleton className="mb-4 h-6 w-3/4" />
                <Skeleton className="mb-4 h-4 w-full" />
                <Skeleton className="mb-4 h-4 w-full" />
                <Skeleton className="mb-4 h-4 w-full" />
                <Skeleton className="mb-4 h-4 w-full" />
                <Skeleton className="mb-4 h-4 w-full" />
            </div>
        </section>
    );
}
