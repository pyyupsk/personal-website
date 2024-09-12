import { createEnv } from '@t3-oss/env-nextjs';
import { z } from 'zod';

export const env = createEnv({
    client: {
        NEXT_PUBLIC_DISCORD_USER_ID: z.string(),
    },
    runtimeEnv: {
        AUTH_GITHUB_ID: process.env.AUTH_GITHUB_ID,
        AUTH_GITHUB_SECRET: process.env.AUTH_GITHUB_SECRET,
        DATABASE_URL: process.env.POSTGRES_PRISMA_URL,
        FASTWORK_USER_ID: process.env.FASTWORK_USER_ID,
        NEXT_PUBLIC_DISCORD_USER_ID: process.env.NEXT_PUBLIC_DISCORD_USER_ID,
        NODE_ENV: process.env.NODE_ENV,
    },
    server: {
        AUTH_GITHUB_ID: z.string(),
        AUTH_GITHUB_SECRET: z.string(),
        DATABASE_URL: z.string().url(),
        FASTWORK_USER_ID: z.string(),
        NODE_ENV: z.enum(['development', 'test', 'production']),
    },
});
