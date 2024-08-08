import { env } from "@/env";
import { prisma } from "@/utils/prisma";
import { Projects } from "@prisma/client";
import Link from "next/link";
import { buttonVariants } from "../ui/button";
import { Card } from "./card";

const LIMIT: number = 6;

const prod: boolean = env.NODE_ENV === "production";

export async function List() {
    const [projects, total] = await Promise.all([
        prod
            ? prisma.projects.findMany({
                  orderBy: { createdAt: "desc" },
                  take: LIMIT,
                  where: { published: true },
                  select: { id: true, title: true, description: true, url: true, thumbnail: true },
              })
            : Array<Projects>(),
        prod ? prisma.projects.count() : Promise.resolve(0),
    ]);

    return (
        <div className="my-8 space-y-4">
            <h1>
                Latest Projects ({projects.length}/{total})
            </h1>
            <div className="grid grid-cols-2 gap-2">
                {projects.map((project) => (
                    <Card key={project.id} project={project} />
                ))}
            </div>
            {total > LIMIT && (
                <div className="flex justify-end">
                    <Link
                        href="/projects"
                        className={buttonVariants({ variant: "outline", size: "sm" })}
                    >
                        See all projects
                    </Link>
                </div>
            )}
        </div>
    );
}
