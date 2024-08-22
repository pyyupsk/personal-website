import { inngest } from "@/lib/inngest";
import { UserCreated } from "@/lib/inngest/functions";
import { serve } from "inngest/next";

export const { POST } = serve({
    client: inngest,
    functions: [UserCreated],
});
