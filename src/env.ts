import { createEnv } from '@t3-oss/env-nextjs';
import { z } from 'zod';

export const env = createEnv({
    server: {
        NODE_ENV: z.enum(['development', 'test', 'production']),
    },
    client: {
        NEXT_PUBLIC_GOOGLE_API_KEY: z.string(),
    },
    runtimeEnv: {
        NODE_ENV: process.env.NODE_ENV,
        NEXT_PUBLIC_GOOGLE_API_KEY: process.env.NEXT_PUBLIC_GOOGLE_API_KEY,
    },
});
