import { env } from "@/env";

export const BASE_URL: string =
    env.NODE_ENV === "production" ? "https://pyyupsk.vercel.app" : "http://localhost:3000";
