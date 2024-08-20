import { prisma } from "@/lib/prisma";
import { clerkClient, clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

const isPublicRoute = createRouteMatcher(["/", "/sign-in(.*)", "/sign-up(.*)"]);

export default clerkMiddleware(async (auth, request) => {
    if (!isPublicRoute(request)) {
        auth().protect();
    }

    const userId = auth().userId;

    if (!userId) return;

    const user = await clerkClient().users.getUser(userId);

    if (!user) return;

    try {
        await prisma.user.upsert({
            where: { id: userId },
            create: {
                id: userId,
                email: user.emailAddresses[0].emailAddress,
            },
            update: {},
        });
    } catch (error) {
        if (error instanceof Error) {
            if (error.message.includes("Unique constraint failed")) {
                console.log("User already exists in the database. Ignoring error.");
            } else {
                throw error;
            }
        } else {
            console.error("Unexpected error type:", error);
            throw new Error("Unexpected error occurred");
        }
    }
});

export const config = {
    matcher: [
        "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
        "/(api|trpc)(.*)",
    ],
};
