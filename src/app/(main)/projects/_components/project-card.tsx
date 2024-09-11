import { Badge } from '@/components/ui/badge';
import { type Project } from '@prisma/client';
import { Link } from 'next-view-transitions';

import { getStatusColor } from './utils';

export function ProjectCard({ project }: { project: Project }) {
    return (
        <Link
            className="rounded-md border p-3 shadow-md transition-all hover:scale-[1.01]"
            href={project.link}
            rel="noopener noreferrer"
            target="_blank"
        >
            <div className="flex items-center justify-between gap-3">
                <h3>{project.title}</h3>
                <Badge className={getStatusColor(project.status)}>
                    {project.status.replace('_', ' ')}
                </Badge>
            </div>
            <p className="line-clamp-3 text-sm">{project.description}</p>
        </Link>
    );
}
