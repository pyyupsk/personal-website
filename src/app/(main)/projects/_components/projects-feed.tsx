'use client';

import type { ListOutput } from '@/server/api/routers/projects';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { EmptyState } from '@/components/ui/empty-state';
import { cn } from '@/lib/utils';
import { SearchIcon } from 'lucide-react';
import { useQueryState } from 'nuqs';
import { useMemo } from 'react';

import { ProjectsFilter } from './projects-filter';
import { getStatusColor } from './utils';

export function ProjectsFeed({ projects }: { projects: ListOutput }) {
    const [title, setTitle] = useQueryState('title', {
        defaultValue: '',
    });
    const [status, setStatus] = useQueryState('status', {
        defaultValue: 'ALL',
    });

    const resetFilters = () => {
        setTitle('');
        setStatus('ALL');
    };

    const filteredProjects = useMemo(() => {
        return projects.filter(
            (project) =>
                title !== null &&
                project.title.toLowerCase().includes(title.toLowerCase()) &&
                (status === 'ALL' || project.status === status),
        );
    }, [projects, status, title]);

    if (filteredProjects.length === 0) {
        return (
            <>
                <ProjectsFilter
                    setStatus={setStatus}
                    setTitle={setTitle}
                    status={status}
                    title={title}
                />
                <EmptyState
                    description="We couldn't find any projects that match your search criteria. Try adjusting your filters or search term."
                    icon={SearchIcon}
                    title="No Projects Found"
                >
                    <Button onClick={resetFilters} variant="outline">
                        Clear Filters
                    </Button>
                </EmptyState>
            </>
        );
    }

    return (
        <>
            <ProjectsFilter
                setStatus={setStatus}
                setTitle={setTitle}
                status={status}
                title={title}
            />
            <section className="flex flex-col gap-3">
                {filteredProjects.map((project) => (
                    <a
                        className="rounded-md border p-3 shadow-md transition-all hover:scale-[1.01]"
                        href={project.link}
                        key={project.id}
                        rel="noopener noreferrer"
                        target="_blank"
                    >
                        <div className="flex items-center justify-between gap-3">
                            <p className="">{project.title}</p>
                            <Badge className={cn('rounded-full', getStatusColor(project.status))}>
                                {project.status.replace('_', ' ')}
                            </Badge>
                        </div>
                        <p className="mt-2 line-clamp-3 text-sm text-muted-foreground">
                            {project.description}
                        </p>
                    </a>
                ))}
            </section>
        </>
    );
}
