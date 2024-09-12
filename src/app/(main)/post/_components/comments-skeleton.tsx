import { Skeleton } from '@/components/ui/skeleton';

export function CommentsSkeleton({ count }: { count: number }) {
    return (
        <div className="space-y-1.5 divide-y">
            {Array.from({ length: count }).map((_, index) => (
                <div className="flex gap-3 bg-background py-3 shadow-sm" key={index}>
                    <Skeleton className="size-8 rounded-full" />
                    <div className="flex flex-col gap-1">
                        <div className="flex items-center">
                            <Skeleton className="h-4 w-24" />
                            <time className="ml-2 text-sm text-muted-foreground">
                                <Skeleton className="h-3 w-14" />
                            </time>
                        </div>
                        <Skeleton className="h-3 w-3/4" />
                    </div>
                </div>
            ))}
        </div>
    );
}
