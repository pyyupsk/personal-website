import type { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
    return {
        rules: {
            allow: '/',
            userAgent: '*',
        },
        sitemap: 'https://pyyupsk.vercel.app/sitemap.xml',
    };
}
