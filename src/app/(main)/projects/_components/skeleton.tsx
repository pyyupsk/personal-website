import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Skeleton as SkeletonComponent } from '@/components/ui/skeleton';

export function Skeleton({ count }: { count: number }) {
    return (
        <section className="grid grid-cols-1 gap-3 md:grid-cols-2">
            {Array.from({ length: count }).map((_, index) => (
                <Card key={index}>
                    <CardHeader className="p-0">
                        <SkeletonComponent className="h-40 w-full rounded-t-lg" />
                    </CardHeader>
                    <CardContent className="p-4">
                        <SkeletonComponent className="mb-2 h-6 w-3/4 rounded-md" />
                        <SkeletonComponent className="mb-4 h-4 w-full rounded-md" />
                        <SkeletonComponent className="mb-4 h-4 w-full rounded-md" />
                    </CardContent>
                    <CardFooter className="p-4 pt-0">
                        <SkeletonComponent className="h-6 w-1/4 rounded-md" />
                    </CardFooter>
                </Card>
            ))}
        </section>
    );
}
