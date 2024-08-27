import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { prisma } from '@/server/prisma';
import { BarChart, FileText, Layers } from 'lucide-react';

export async function Status() {
    const projects = await prisma.project.count();
    const posts = await prisma.post.count();
    const comments = await prisma.comment.count();

    const stats = [
        { icon: FileText, title: 'Total Posts', value: projects },
        { icon: Layers, title: 'Total Projects', value: posts },
        { icon: BarChart, title: 'Total Comments', value: comments },
    ];

    return (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            {stats.map((stat, index) => (
                <Card key={index}>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
                        <stat.icon className="size-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{stat.value}</div>
                    </CardContent>
                </Card>
            ))}
        </div>
    );
}
