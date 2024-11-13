import type { MetadataRoute } from 'next';

import { BASE_URL } from '@/constants/base-url';

export default function robots(): MetadataRoute.Robots {
    return {
        rules: {
            allow: '/',
            userAgent: '*',
        },
        sitemap: `${BASE_URL}/sitemap.xml`,
    };
}
