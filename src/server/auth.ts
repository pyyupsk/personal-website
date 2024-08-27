import { env } from '@/env';
import { prisma } from '@/server/prisma';
import { PrismaAdapter } from '@auth/prisma-adapter';
import { type $Enums } from '@prisma/client';
import NextAuth, { type DefaultSession } from 'next-auth';
import GitHub from 'next-auth/providers/github';

declare module 'next-auth' {
    interface Session {
        user: {
            role: $Enums.Role;
        } & DefaultSession['user'];
    }
}

export const { auth, handlers, signIn, signOut } = NextAuth({
    adapter: PrismaAdapter(prisma),
    callbacks: {
        session: ({ session }) => ({
            ...session,
            user: {
                ...session.user,
                role: session.user.role as $Enums.Role,
            },
        }),
    },
    providers: [
        GitHub({
            clientId: env.AUTH_GITHUB_ID,
            clientSecret: env.AUTH_GITHUB_SECRET,
        }),
    ],
});
