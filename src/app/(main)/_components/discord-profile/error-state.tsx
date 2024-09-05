import { Skeleton } from '@/components/ui/skeleton';

export function ErrorState() {
    return (
        <div className="flex items-center space-x-1.5">
            <Skeleton className="size-10 rounded-full border-2 border-muted" />
            <div>
                <p className="font-semibold">cannot fetch data</p>
            </div>
        </div>
    );
}
