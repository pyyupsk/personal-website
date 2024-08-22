import { inngest } from "@/inngest/client";
import { UserCreated } from "@/inngest/functions/user-created";
import { serve } from "inngest/next";

export const { POST } = serve({
    client: inngest,
    functions: [UserCreated],
});
