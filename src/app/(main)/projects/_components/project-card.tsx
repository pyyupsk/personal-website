import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import { Link } from 'next-view-transitions';

import type { ProjectData } from '../_types/ProjectData';

import { getStatusColor } from './utils';

export function ProjectCard({ project }: { project: ProjectData }) {
    return (
        <Link
            className="rounded-md border p-3 shadow-md transition-all hover:scale-[1.01]"
            href={project.link}
            rel="noopener noreferrer"
            target="_blank"
        >
            <div className="flex items-center justify-between gap-3">
                <h3>{project.title}</h3>
                <Badge className={cn('rounded-full', getStatusColor(project.status))}>
                    {project.status.replace('_', ' ')}
                </Badge>
            </div>
            <p className="line-clamp-3 text-sm">{project.description}</p>
        </Link>
    );
}
