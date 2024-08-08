import { Projects } from "@prisma/client";
import Image from "next/image";
import Link from "next/link";

export function Card({
    project,
}: {
    project: Omit<Projects, "published" | "updatedAt" | "createdAt">;
}) {
    return (
        <Link
            key={project.id}
            href={project.url}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-lg border p-3 hover:scale-105 transition-all duration-500 ease-in-out"
        >
            <div className="relative aspect-video rounded overflow-hidden">
                <Image src={project.thumbnail} alt={project.title} width={500} height={500} />
            </div>
            <div className="flex flex-col gap-1 mt-2">
                <p className="text-sm">{project.title}</p>
                <p className="text-xs text-muted-foreground">{project.description}</p>
            </div>
        </Link>
    );
}
