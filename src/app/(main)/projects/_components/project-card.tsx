import { Badge } from '@/components/ui/badge';
import { type Project } from '@prisma/client';
import Image from 'next/image';
import Link from 'next/link';

import { getStatusColor } from './utils';

export function ProjectCard({ project }: { project: Project }) {
    return (
        <Link
            className="grid grid-cols-1 gap-3 rounded-md py-3 first:pt-0 sm:grid-cols-6"
            href={project.link}
        >
            <div className="relative sm:col-span-2">
                <Image
                    alt={project.title}
                    className="aspect-video rounded-md"
                    height={500}
                    src={project.thumbnails}
                    width={500}
                />
            </div>
            <div className="sm:col-span-4">
                <div className="flex flex-wrap items-center gap-3">
                    <h3>{project.title}</h3>
                    <Badge className={getStatusColor(project.status)}>
                        {project.status.replace('_', ' ')}
                    </Badge>
                </div>
                <p className="line-clamp-3 text-sm">{project.description}</p>
            </div>
        </Link>
    );
}
