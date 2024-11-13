import type { Metadata } from 'next/dist/lib/metadata/types/metadata-interface';
import type { TemplateString } from 'next/dist/lib/metadata/types/metadata-types';

import { BASE_URL } from '@/constants/base-url';

type CommonMetaData = {
    description: string;
    image?: string;
    title: string | TemplateString;
};

export function commonMetaData({ description, image, title }: CommonMetaData): Metadata {
    return {
        authors: [{ name: '@pyyupsk' }],
        description,
        metadataBase: new URL(BASE_URL),
        openGraph: {
            description,
            images: image
                ? [
                      {
                          height: 630,
                          url: image,
                          width: 1200,
                      },
                  ]
                : undefined,
            title,
        },
        title,
    };
}
