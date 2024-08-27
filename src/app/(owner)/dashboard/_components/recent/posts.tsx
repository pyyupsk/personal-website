import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { prisma } from '@/server/prisma';
import { getStatusColor } from '@/utils/colors';

export async function RecentPosts() {
    const recentPosts = await prisma.post.findMany({
        orderBy: {
            publishDate: 'desc',
        },
        select: {
            description: true,
            id: true,
            status: true,
            title: true,
        },
        take: 3,
    });

    return (
        <Card className="col-span-1">
            <CardHeader>
                <CardTitle>Recent Blog Posts</CardTitle>
                <CardDescription>Latest published articles</CardDescription>
            </CardHeader>
            <CardContent>
                <div className="space-y-4">
                    {recentPosts.map((post) => (
                        <div className="flex items-center" key={post.id}>
                            <div className="ml-4 space-y-1">
                                <p className="line-clamp-1 !text-base !text-foreground">
                                    {post.title}{' '}
                                </p>
                                <p className="line-clamp-2">{post.description}</p>
                                <Badge className={getStatusColor(post.status)}>
                                    {post.status.replace('_', ' ')}
                                </Badge>
                            </div>
                        </div>
                    ))}
                </div>
            </CardContent>
        </Card>
    );
}
