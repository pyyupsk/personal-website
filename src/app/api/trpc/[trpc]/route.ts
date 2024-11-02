import type { NextRequest } from 'next/server';

import { env } from '@/env';
import { appRouter } from '@/server/api/root';
import { createTRPCContext } from '@/server/api/trpc';
import { fetchRequestHandler } from '@trpc/server/adapters/fetch';

/**
 * This wraps the `createTRPCContext` helper and provides the required context for the tRPC API when
 * handling a HTTP request (e.g. when you make requests from Client Components).
 */
const createContext = async (req: NextRequest) => {
    return createTRPCContext({
        headers: req.headers,
    });
};

const handler = (req: NextRequest) =>
    fetchRequestHandler({
        createContext: () => createContext(req),
        endpoint: '/api/trpc',
        onError:
            env.NODE_ENV === 'development'
                ? ({ error, path }) => {
                      console.error(`❌ tRPC failed on ${path ?? '<no-path>'}: ${error.message}`);
                  }
                : undefined,
        req,
        router: appRouter,
    });

export { handler as GET, handler as POST };
