import { Badge } from '@/components/ui/badge';
import { getStatusColor } from '@/utils/colors';
import { type Project } from '@prisma/client';
import Image from 'next/image';
import Link from 'next/link';

export function ProjectCard({ project }: { project: Project }) {
    return (
        <Link className="grid grid-cols-6 gap-3 rounded-md" href={project.link}>
            <div className="relative col-span-2">
                <Image
                    alt={project.title}
                    className="aspect-video rounded-md"
                    height={200}
                    src={project.thumbnails}
                    width={200}
                />
            </div>
            <div className="col-span-4">
                <div className="flex items-center gap-3">
                    <h3>{project.title}</h3>
                    <Badge className={getStatusColor(project.status)}>{project.status}</Badge>
                </div>
                <p>{project.description}</p>
            </div>
        </Link>
    );
}
