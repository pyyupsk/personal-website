import { Badge } from "@/components/ui/badge";
import { Card as CardComponent, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { $Enums, Project } from "@prisma/client";
import Image from "next/image";

export function ProjectCard({ project }: { project: Project }) {
    return (
        <CardComponent className="group relative overflow-hidden transition-all duration-300 hover:shadow-lg">
            <CardHeader className="p-0">
                <Image
                    src={project.thumbnails}
                    alt={project.title}
                    height={500}
                    width={500}
                    className="aspect-video object-cover rounded-t"
                />
            </CardHeader>
            <CardContent className="p-3">
                <CardTitle className="text-base">{project.title}</CardTitle>
                <div className="relative overflow-hidden max-h-[40px] group-hover:max-h-[100px] transition-all duration-300">
                    <p>{project.description}</p>
                </div>
                <Badge
                    variant={
                        project.status === $Enums.Status.COMPLETED
                            ? "default"
                            : project.status === $Enums.Status.IN_PROGRESS
                              ? "secondary"
                              : "outline"
                    }
                    className="mt-3"
                >
                    {project.status.replace("_", " ")}
                </Badge>
            </CardContent>
        </CardComponent>
    );
}
