import { Separator } from '@/components/ui/separator';
import { Skeleton } from '@/components/ui/skeleton';

export function PostSkeleton() {
    return (
        <>
            <section className="space-y-1.5">
                <div className="flex justify-between">
                    <Skeleton className="h-4 w-48" />
                    <Skeleton className="h-4 w-24" />
                </div>
                <Skeleton className="h-6 w-4/5" />
            </section>
            <Separator className="my-4" />
            <div>
                <Skeleton className="mb-4 h-4 w-full" />
                <Skeleton className="mb-4 h-4 w-3/4" />
                <Skeleton className="mb-4 h-4 w-full" />
                <Skeleton className="mb-4 h-4 w-3/4" />
                <Skeleton className="mb-4 h-4 w-full" />
                <Skeleton className="mb-4 h-4 w-3/4" />
                <Skeleton className="mb-4 h-4 w-2/4" />
            </div>
        </>
    );
}
