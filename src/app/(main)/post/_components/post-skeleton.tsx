import { Skeleton } from "@/components/ui/skeleton";
import { Fragment } from "react";

export function PostContentSkeleton() {
    return (
        <Fragment>
            <div className="flex justify-between">
                <Skeleton className="w-48 h-4" />
                <Skeleton className="w-24 h-4" />
            </div>
            <div>
                <Skeleton className="w-3/4 h-6 mb-4" />
                <Skeleton className="w-full h-4 mb-4" />
                <Skeleton className="w-full h-4 mb-4" />
                <Skeleton className="w-full h-4 mb-4" />
                <Skeleton className="w-full h-4 mb-4" />
                <Skeleton className="w-full h-4 mb-4" />
            </div>
        </Fragment>
    );
}
