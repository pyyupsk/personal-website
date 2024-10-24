'use client';

import { Button } from '@/components/ui/button';
import { EmptyState } from '@/components/ui/empty-state';
import { SearchIcon } from 'lucide-react';
import { useMemo } from 'react';

import { useFilter } from '../_stores/filter';
import { type ProjectData } from '../_types/ProjectData';
import { ProjectCard } from './project-card';

export function ProjectsList({ projects }: { projects: ProjectData[] }) {
    const { searchTerm, setSearchTerm, setStatusFilter, statusFilter } = useFilter();

    const resetFilters = () => {
        setSearchTerm('');
        setStatusFilter('ALL');
    };

    const filteredProjects = useMemo(() => {
        return projects.filter(
            (project) =>
                project.title.toLowerCase().includes(searchTerm.toLowerCase()) &&
                (statusFilter === 'ALL' || project.status === statusFilter),
        );
    }, [projects, searchTerm, statusFilter]);

    if (filteredProjects.length === 0) {
        return (
            <EmptyState
                description="We couldn't find any projects that match your search criteria. Try adjusting your filters or search term."
                icon={SearchIcon}
                title="No Projects Found"
            >
                <Button onClick={resetFilters} variant="outline">
                    Clear Filters
                </Button>
            </EmptyState>
        );
    }

    return (
        <section className="flex flex-col gap-3">
            {filteredProjects.map((project) => (
                <ProjectCard key={project.id} project={project} />
            ))}
        </section>
    );
}
