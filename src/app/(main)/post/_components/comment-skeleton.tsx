import { Skeleton } from "@/components/ui/skeleton";

export function CommentSkeleton({ count }: { count: number }) {
    return (
        <div className="space-y-1.5 divide-y">
            {Array.from({ length: count }).map((_, index) => (
                <div key={index} className="flex gap-3 bg-background py-3 shadow-sm">
                    <Skeleton className="w-8 h-8 rounded-full" />
                    <div className="flex flex-col gap-1">
                        <div className="flex items-center">
                            <Skeleton className="w-24 h-4" />
                            <time className="ml-2 text-sm text-muted-foreground">
                                <Skeleton className="w-14 h-4" />
                            </time>
                        </div>
                        <Skeleton className="w-3/4 h-4" />
                    </div>
                </div>
            ))}
        </div>
    );
}
