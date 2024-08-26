import { Badge } from '@/components/ui/badge';
import { Card as CardComponent, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { getStatusColor } from '@/utils/colors';
import { type Project } from '@prisma/client';
import Image from 'next/image';

export function ProjectCard({ project }: { project: Project }) {
    return (
        <CardComponent className="group relative overflow-hidden transition-all duration-300 hover:shadow-lg">
            <CardHeader className="p-0">
                <Image
                    src={project.thumbnails}
                    alt={project.title}
                    height={500}
                    width={500}
                    className="aspect-video rounded-t object-cover"
                />
            </CardHeader>
            <CardContent className="p-3">
                <CardTitle>{project.title}</CardTitle>
                <div className="relative max-h-[40px] overflow-hidden transition-all duration-300 group-hover:max-h-[100px]">
                    <p>{project.description}</p>
                </div>
                <Badge className={cn('mt-3', getStatusColor(project.status))}>
                    {project.status.replace('_', ' ')}
                </Badge>
            </CardContent>
        </CardComponent>
    );
}
