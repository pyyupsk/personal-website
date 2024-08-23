"use client";

import { Button } from "@/components/ui/button";
import { EmptyState } from "@/components/ui/empty-state";
import { Project } from "@prisma/client";
import { SearchIcon } from "lucide-react";
import { useFilter } from "../_stores/filter";
import { ProjectCard } from "./project-card";

export function ProjectsList({ projects }: { projects: Project[] }) {
    const { searchTerm, statusFilter, setSearchTerm, setStatusFilter } = useFilter();

    const resetFilters = () => {
        setSearchTerm("");
        setStatusFilter("ALL");
    };

    const filteredProjects = projects.filter(
        (project) =>
            project.title.toLowerCase().includes(searchTerm.toLowerCase()) &&
            (statusFilter === "ALL" || project.status === statusFilter),
    );

    if (filteredProjects.length === 0) {
        return (
            <EmptyState
                title="No Projects Found"
                description="We couldn't find any projects that match your search criteria. Try adjusting your filters or search term."
                icon={SearchIcon}
            >
                <Button variant="outline" onClick={resetFilters}>
                    Clear Filters
                </Button>
            </EmptyState>
        );
    }

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {filteredProjects.map((project) => (
                <ProjectCard key={project.id} project={project} />
            ))}
        </div>
    );
}
