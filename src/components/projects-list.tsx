import { env } from "@/env";
import { prisma } from "@/utils/prisma";
import { Projects } from "@prisma/client";
import Image from "next/image";
import Link from "next/link";

const LIMIT: number = 6;

const prod: boolean = env.NODE_ENV === "production";

export async function ProjectsList() {
    const projects = prod
        ? await prisma.projects.findMany({
              orderBy: { createdAt: "desc" },
              take: LIMIT,
              where: { published: true },
              select: { id: true, title: true, description: true, url: true, thumbnail: true },
          })
        : Array<Projects>();

    return (
        <div className="my-8 space-y-4">
            <h1>Latest Projects ({projects.length})</h1>
            <div className="grid grid-cols-2 gap-2">
                {projects.map((project) => (
                    <Link
                        key={project.id}
                        href={project.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="rounded-lg border p-3 hover:scale-105 transition-all duration-500 ease-in-out"
                    >
                        <div className="relative aspect-video rounded overflow-hidden">
                            <Image
                                src={project.thumbnail}
                                alt={project.title}
                                width={500}
                                height={500}
                            />
                        </div>
                        <div className="flex flex-col gap-1 mt-2">
                            <p className="text-sm">{project.title}</p>
                            <p className="text-xs text-muted-foreground">{project.description}</p>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
}
