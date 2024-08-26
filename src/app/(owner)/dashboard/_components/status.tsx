import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { prisma } from "@/lib/prisma";
import { BarChart, FileText, Layers } from "lucide-react";

export async function Status() {
    const projects = await prisma.project.count();
    const posts = await prisma.post.count();
    const comments = await prisma.comment.count();

    const stats = [
        { title: "Total Posts", value: projects, icon: FileText },
        { title: "Total Projects", value: posts, icon: Layers },
        { title: "Total Comments", value: comments, icon: BarChart },
    ];

    return (
        <div className="grid gap-4 grid-cols-1 sm:grid-cols-3">
            {stats.map((stat, index) => (
                <Card key={index}>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
                        <stat.icon className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{stat.value}</div>
                    </CardContent>
                </Card>
            ))}
        </div>
    );
}
