import { createEnv } from '@t3-oss/env-nextjs';
import { z } from 'zod';

export const env = createEnv({
    client: {
        NEXT_PUBLIC_DISCORD_USER_ID: z.string(),
    },
    runtimeEnv: {
        FASTWORK_USER_ID: process.env.FASTWORK_USER_ID,
        NEXT_PUBLIC_DISCORD_USER_ID: process.env.NEXT_PUBLIC_DISCORD_USER_ID,
        NODE_ENV: process.env.NODE_ENV,
    },
    server: {
        FASTWORK_USER_ID: z.string(),
        NODE_ENV: z.enum(['development', 'test', 'production']),
    },
});
