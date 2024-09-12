import { Skeleton } from '@/components/ui/skeleton';

export function LoadingState() {
    return (
        <div className="flex items-center space-x-1.5">
            <Skeleton className="size-10 rounded-full border-2 border-muted" />
            <div>
                <Skeleton className="h-5 w-24" />
                <Skeleton className="mt-2 h-3 w-36" />
            </div>
        </div>
    );
}
