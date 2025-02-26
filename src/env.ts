import { createEnv } from '@t3-oss/env-nextjs';
import { z } from 'zod';

export const env = createEnv({
    client: {
        NEXT_PUBLIC_DISCORD_USER_ID: z.string(),
    },
    runtimeEnv: {
        DATABASE_URL: process.env.DATABASE_URL,
        FASTWORK_USER_ID: process.env.FASTWORK_USER_ID,
        GOOGLE_VERIFICATION: process.env.GOOGLE_VERIFICATION,
        NEXT_PUBLIC_DISCORD_USER_ID: process.env.NEXT_PUBLIC_DISCORD_USER_ID,
        NODE_ENV: process.env.NODE_ENV,
    },
    server: {
        DATABASE_URL: z.string(),
        FASTWORK_USER_ID: z.string(),
        GOOGLE_VERIFICATION: z.string(),
    },
    shared: {
        NODE_ENV: z.enum(['development', 'test', 'production']),
    },
});
