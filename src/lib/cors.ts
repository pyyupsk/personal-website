interface CorsOptions {
    allowedHeaders?: string | string[];
    credentials?: boolean;
    exposedHeaders?: string | string[];
    maxAge?: number;
    methods?: string | string[];
    optionsSuccessStatus?: number;
    origin?: OriginFn | StaticOrigin;
    preflightContinue?: boolean;
}

type OriginFn = (
    _origin: string | undefined,
    _req: Request,
) => Promise<StaticOrigin> | StaticOrigin;

type StaticOrigin = (boolean | RegExp | string)[] | boolean | RegExp | string;

const defaultOptions: CorsOptions = {
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    optionsSuccessStatus: 204,
    origin: '*',
    preflightContinue: false,
};

export async function cors(req: Request, res: Response, options?: CorsOptions) {
    const opts = { ...defaultOptions, ...options };
    const { headers } = res;
    const originHeaders = await originHeadersFromReq(req, opts.origin ?? false);
    const mergeHeaders = (v: string, k: string) => {
        if (k === 'Vary') headers.append(k, v);
        else headers.set(k, v);
    };

    // If there's no origin we won't touch the response
    if (!originHeaders) return res;

    originHeaders.forEach(mergeHeaders);

    if (opts.credentials) {
        headers.set('Access-Control-Allow-Credentials', 'true');
    }

    const exposed = Array.isArray(opts.exposedHeaders)
        ? opts.exposedHeaders.join(',')
        : opts.exposedHeaders;

    if (exposed) {
        headers.set('Access-Control-Expose-Headers', exposed);
    }

    // Handle the preflight request
    if (req.method === 'OPTIONS') {
        if (opts.methods) {
            const methods = Array.isArray(opts.methods) ? opts.methods.join(',') : opts.methods;

            headers.set('Access-Control-Allow-Methods', methods);
        }

        getAllowedHeaders(req, opts.allowedHeaders).forEach(mergeHeaders);

        if (typeof opts.maxAge === 'number') {
            headers.set('Access-Control-Max-Age', String(opts.maxAge));
        }

        if (opts.preflightContinue) return res;

        headers.set('Content-Length', '0');
        return new Response(null, { headers, status: opts.optionsSuccessStatus });
    }

    return res;
}

function getAllowedHeaders(req: Request, allowed?: string | string[]) {
    const headers = new Headers();

    if (!allowed) {
        allowed = req.headers.get('Access-Control-Request-Headers')!;
        headers.append('Vary', 'Access-Control-Request-Headers');
    } else if (Array.isArray(allowed)) {
        // If the allowed headers is an array, turn it into a string
        allowed = allowed.join(',');
    }
    if (allowed) {
        headers.set('Access-Control-Allow-Headers', allowed);
    }

    return headers;
}

// originHeadersFromReq

function getOriginHeaders(reqOrigin: string | undefined, origin: StaticOrigin) {
    const headers = new Headers();

    if (origin === '*') {
        // Allow any origin
        headers.set('Access-Control-Allow-Origin', '*');
    } else if (typeof origin === 'string') {
        // Fixed origin
        headers.set('Access-Control-Allow-Origin', origin);
        headers.append('Vary', 'Origin');
    } else {
        const allowed = isOriginAllowed(reqOrigin ?? '', origin);

        if (allowed && reqOrigin) {
            headers.set('Access-Control-Allow-Origin', reqOrigin);
        }
        headers.append('Vary', 'Origin');
    }

    return headers;
}

function isOriginAllowed(origin: string, allowed: StaticOrigin): boolean {
    return Array.isArray(allowed)
        ? allowed.some((o) => isOriginAllowed(origin, o))
        : typeof allowed === 'string'
          ? origin === allowed
          : allowed instanceof RegExp
            ? allowed.test(origin)
            : !!allowed;
}

async function originHeadersFromReq(req: Request, origin: OriginFn | StaticOrigin) {
    const reqOrigin = req.headers.get('Origin') || undefined;
    const value = typeof origin === 'function' ? await origin(reqOrigin, req) : origin;

    if (!value) return;
    return getOriginHeaders(reqOrigin, value);
}
