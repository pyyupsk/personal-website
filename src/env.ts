import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";

export const env = createEnv({
    server: {
        NODE_ENV: z.enum(["development", "test", "production"]),
        GOOGLE_API_KEY: z.string(),
        DATABASE_URL: z.string(),
        FASTWORK_API_KEY: z.string(),
        OWNER_ID: z.string(),
    },
    runtimeEnv: {
        NODE_ENV: process.env.NODE_ENV,

        GOOGLE_API_KEY: process.env.GOOGLE_API_KEY,
        DATABASE_URL: process.env.DATABASE_URL,
        FASTWORK_API_KEY: process.env.FASTWORK_API_KEY,

        OWNER_ID: process.env.OWNER_ID,
    },
});
