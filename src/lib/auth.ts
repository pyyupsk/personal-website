import { env } from "@/env";
import { prisma } from "@/lib/prisma";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { $Enums } from "@prisma/client";
import NextAuth, { DefaultSession } from "next-auth";
import GitHub from "next-auth/providers/github";

declare module "next-auth" {
    interface Session {
        user: {
            role: $Enums.Role;
        } & DefaultSession["user"];
    }
}

export const { handlers, signIn, signOut, auth } = NextAuth({
    adapter: PrismaAdapter(prisma),
    providers: [
        GitHub({
            clientId: env.AUTH_GITHUB_ID,
            clientSecret: env.AUTH_GITHUB_SECRET,
        }),
    ],
    callbacks: {
        session: ({ session }) => ({
            ...session,
            user: {
                ...session.user,
                role: session.user.role as $Enums.Role,
            },
        }),
    },
});
