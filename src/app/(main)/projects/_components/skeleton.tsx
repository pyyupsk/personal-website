import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Skeleton as SkeletonComponent } from "@/components/ui/skeleton";

export function Skeleton({ count }: { count: number }) {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {Array.from({ length: count }).map((_, index) => (
                <Card key={index}>
                    <CardHeader className="p-0">
                        <SkeletonComponent className="w-full h-40 rounded-t-lg" />
                    </CardHeader>
                    <CardContent className="p-4">
                        <SkeletonComponent className="h-6 rounded-md w-3/4 mb-2" />
                        <SkeletonComponent className="h-4 rounded-md w-full mb-4" />
                        <SkeletonComponent className="h-4 rounded-md w-full mb-4" />
                    </CardContent>
                    <CardFooter className="p-4 pt-0">
                        <SkeletonComponent className="h-6 rounded-md w-1/4" />
                    </CardFooter>
                </Card>
            ))}
        </div>
    );
}
