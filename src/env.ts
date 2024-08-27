import { createEnv } from '@t3-oss/env-nextjs';
import { z } from 'zod';

export const env = createEnv({
    runtimeEnv: {
        AUTH_GITHUB_ID: process.env.AUTH_GITHUB_ID,
        AUTH_GITHUB_SECRET: process.env.AUTH_GITHUB_SECRET,
        DATABASE_URL: process.env.POSTGRES_PRISMA_URL,
        NODE_ENV: process.env.NODE_ENV,
    },
    server: {
        AUTH_GITHUB_ID: z.string(),
        AUTH_GITHUB_SECRET: z.string(),
        DATABASE_URL: z.string().url(),
        NODE_ENV: z.enum(['development', 'test', 'production']),
    },
});
