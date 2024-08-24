import { prisma } from "@/lib/prisma";
import { ProjectsList } from "./projects-list";

export async function ProjectsFeed() {
    const projects = await prisma.project.findMany({
        orderBy: {
            id: "desc",
        },
        cacheStrategy: { ttl: 3600 },
    });

    return <ProjectsList projects={projects} />;
}
