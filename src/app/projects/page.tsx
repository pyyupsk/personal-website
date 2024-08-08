import { Backward } from "@/components/backward";
import { Card } from "@/components/project/card";
import { env } from "@/env";
import { commonMetaData } from "@/lib/meta";
import { prisma } from "@/utils/prisma";
import { Projects } from "@prisma/client";
import { Fragment } from "react";

const prod: boolean = env.NODE_ENV === "production";

export function generateMetadata() {
    const title = "Projects by Pongsakorn Thipayanate | Full Stack Developer";
    const description =
        "Explore the latest projects by Pongsakorn Thipayanate, a full-stack developer from Samut Sakhon, Thailand. Discover innovative solutions and impactful technology projects. Get inspired by the work and reach out for collaboration opportunities.";

    return commonMetaData({ title, description });
}

export default async function Page() {
    const projects = prod
        ? await prisma.projects.findMany({
              orderBy: { createdAt: "desc" },
              where: { published: true },
              select: { id: true, title: true, description: true, url: true, thumbnail: true },
          })
        : Array<Projects>();

    return (
        <Fragment>
            <div className="space-y-4">
                <Backward href="/">Back to Home</Backward>
                <h1>Projects</h1>
                <div className="grid grid-cols-2 gap-2">
                    {projects.map((project) => (
                        <Card key={project.id} project={project} />
                    ))}
                </div>
            </div>
        </Fragment>
    );
}
