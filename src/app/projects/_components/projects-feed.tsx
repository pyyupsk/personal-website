import { prisma } from "@/lib/prisma";
import { ProjectsList } from "./projects-list";

export async function ProjectsFeed() {
    const projects = await prisma.project.findMany({
        orderBy: {
            startDate: "desc",
        },
    });

    return <ProjectsList projects={projects} />;
}
