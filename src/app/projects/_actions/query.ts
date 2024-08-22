"use server";

import { prisma } from "@/lib/prisma";

export async function projects(page = 1, pageSize = undefined) {
    const skip = pageSize ? (page - 1) * pageSize : undefined;

    try {
        const projects = await prisma.project.findMany({
            take: pageSize,
            skip,
            orderBy: {
                startDate: "desc",
            },
        });

        const total = await prisma.project.count();

        return { projects, total };
    } catch (error) {
        console.error("Failed to fetch projects:", error);
        throw new Error("Failed to fetch projects. Please try again later.");
    } finally {
        await prisma.$disconnect();
    }
}
