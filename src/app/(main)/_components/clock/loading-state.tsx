import { Skeleton } from '@/components/ui/skeleton';

export function LoadingState() {
    return (
        <div className="flex items-center justify-center gap-1.5">
            <div className="flex flex-col justify-center">
                <Skeleton className="h-4 w-36" />
                <Skeleton className="mt-2 h-4 w-40" />
            </div>
            <Skeleton className="size-12 rounded-full" />
        </div>
    );
}
