'use client';

import { Button } from '@/components/ui/button';
import { EmptyState } from '@/components/ui/empty-state';
import { type Project } from '@prisma/client';
import { SearchIcon } from 'lucide-react';

import { useFilter } from '../_stores/filter';
import { ProjectCard } from './project-card';

export function ProjectsList({ projects }: { projects: Project[] }) {
    const { searchTerm, setSearchTerm, setStatusFilter, statusFilter } = useFilter();

    const resetFilters = () => {
        setSearchTerm('');
        setStatusFilter('ALL');
    };

    const filteredProjects = projects.filter(
        (project) =>
            project.title.toLowerCase().includes(searchTerm.toLowerCase()) &&
            (statusFilter === 'ALL' || project.status === statusFilter),
    );

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
        <section className="flex flex-col divide-y">
            {filteredProjects.map((project) => (
                <ProjectCard key={project.id} project={project} />
            ))}
        </section>
    );
}
