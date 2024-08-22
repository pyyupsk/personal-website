import { Skeleton as SkeletonComponent } from "@/components/ui/skeleton";

export function Skeleton({ count }: { count: number }) {
    return (
        <div className="flex flex-col gap-3">
            {Array.from({ length: count }).map((_, index) => (
                <div key={index}>
                    <SkeletonComponent className="h-6 rounded-md w-3/4 mb-2" />
                    <SkeletonComponent className="h-4 rounded-md w-24 mb-4" />
                    <SkeletonComponent className="h-4 rounded-md w-full mb-4" />
                    <SkeletonComponent className="h-4 rounded-md w-3/5 mb-2" />
                </div>
            ))}
        </div>
    );
}
