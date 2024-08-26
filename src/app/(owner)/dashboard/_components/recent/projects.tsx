import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { prisma } from '@/lib/prisma';
import { getStatusColor } from '@/utils/colors';

export async function RecentProjects() {
    const recentProjects = await prisma.project.findMany({
        take: 3,
        select: {
            id: true,
            title: true,
            description: true,
            status: true,
        },
        orderBy: {
            id: 'desc',
        },
    });

    return (
        <Card className="col-span-1">
            <CardHeader>
                <CardTitle>Recent Projects</CardTitle>
                <CardDescription>Latest updates on your projects</CardDescription>
            </CardHeader>
            <CardContent>
                <div className="space-y-4">
                    {recentProjects.map((project) => (
                        <div key={project.id} className="flex items-center">
                            <div className="ml-4 space-y-1">
                                <p className="line-clamp-1 !text-base !text-foreground">
                                    {project.title}{' '}
                                </p>
                                <p className="line-clamp-2">{project.description}</p>
                                <Badge className={getStatusColor(project.status)}>
                                    {project.status.replace('_', ' ')}
                                </Badge>
                            </div>
                        </div>
                    ))}
                </div>
            </CardContent>
        </Card>
    );
}
