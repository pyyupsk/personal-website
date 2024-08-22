import { projects as projectsQuery } from "../_actions/query";
import { ProjectsList } from "./projects-list";

export async function ProjectsFeed() {
    const { projects } = await projectsQuery(1);

    return <ProjectsList projects={projects} />;
}
