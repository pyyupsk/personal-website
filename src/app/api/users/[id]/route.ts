import { prisma } from "@/lib/prisma";

export function GET(request: Request, { params }: { params: { id: string } }) {
    const id = params.id;

    try {
        const user = prisma.user.findUnique({
            where: { id },
            include: { comments: true },
        });

        if (!user) {
            return new Response(JSON.stringify({ error: "User not found" }), { status: 404 });
        }

        return new Response(JSON.stringify(user), { status: 200 });
    } catch (error) {
        return new Response(JSON.stringify({ error }), { status: 500 });
    }
}
