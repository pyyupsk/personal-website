import { Skeleton as SkeletonComponent } from '@/components/ui/skeleton';
import { Star } from 'lucide-react';

export function Skeleton({ count }: { count: number }) {
    return (
        <section className="flex flex-col gap-3">
            {Array.from({ length: count }).map((_, index) => (
                <div className="flex flex-col gap-3 rounded-md border p-3 shadow-md" key={index}>
                    <div className="flex items-center gap-3">
                        <SkeletonComponent className="size-10 rounded-full" />
                        <div className="flex flex-col py-1">
                            <SkeletonComponent className="mb-2 h-4 w-16 rounded-md" />
                            <SkeletonComponent className="h-3 w-32 rounded-md" />
                        </div>
                        <div className="ml-auto flex gap-0 transition-all group-hover:gap-px">
                            {[...Array(5)].map((_, i) => (
                                <Star
                                    className="size-4 animate-pulse fill-muted text-muted transition-all group-hover:scale-105"
                                    key={i}
                                />
                            ))}
                        </div>
                    </div>
                    {index % 2 === 0 && (
                        <div>
                            <SkeletonComponent className="mb-2 h-3 w-full rounded-md" />
                            <SkeletonComponent className="h-3 w-3/5 rounded-md" />
                        </div>
                    )}
                </div>
            ))}
        </section>
    );
}
