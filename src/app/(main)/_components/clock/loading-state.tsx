import { Skeleton } from '@/components/ui/skeleton';

export function LoadingState() {
    return (
        <div className="flex items-center justify-center gap-1.5">
            <div className="flex flex-col justify-center">
                <Skeleton className="h-3 w-20" />
                <Skeleton className="mt-2 h-3 w-24" />
            </div>
            <Skeleton className="size-12 rounded-full" />
        </div>
    );
}
