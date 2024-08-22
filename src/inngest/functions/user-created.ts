import { prisma } from "@/lib/prisma";
import { UserWebhookEvent } from "@clerk/nextjs/server";
import { inngest } from "../client";

export const UserCreated = inngest.createFunction(
    { id: "clerk-user-created" },
    { event: "clerk/user.created" },
    async ({ event }: { event: UserWebhookEvent }) => {
        if (!event || !event.data) {
            throw new Error("Event or event data is missing");
        }

        // Narrow the type based on event type
        if (event.type !== "user.created") return;

        const { id, username, email_addresses, primary_email_address_id, created_at } = event.data;

        if (!id || !email_addresses || !primary_email_address_id || !created_at) {
            throw new Error("Missing required field(s) in event data");
        }

        const emailAddress = email_addresses.find((email) => email.id === primary_email_address_id);

        if (!emailAddress || !emailAddress.email_address) {
            throw new Error("Missing required email address in event data");
        }

        const email = emailAddress.email_address;

        await prisma.user.upsert({
            where: { id },
            create: {
                id,
                username: username || email, // Use email as username fallback
                email,
                joinDate: new Date(created_at * 1000), // Convert timestamp to Date
            },
            update: {},
        });
    },
);
