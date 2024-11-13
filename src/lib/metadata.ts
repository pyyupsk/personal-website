import type { Metadata } from 'next';

import { BASE_URL } from '@/constants/base-url';
import { env } from '@/env';

type MetadataOptions = {
    additionalMetadata?: Partial<Metadata>;
    description: string;
    image?: string;
    title: string;
};

const DEFAULT_AUTHOR = {
    name: 'Pongsakorn Thipayanate',
    url: BASE_URL,
};
const APPLICATION_NAME = 'Pongsakorn Thipayanate';
const TWITTER_HANDLE = '@pyyupsk_';
const DEFAULT_IMAGE_DIMENSIONS = { height: 630, width: 1200 };

export function generateMetadata({
    additionalMetadata = {},
    description,
    image,
    title,
}: MetadataOptions): Metadata {
    const baseMetadata: Metadata = {
        appleWebApp: {
            capable: true,
            statusBarStyle: 'default',
            title: title,
        },
        applicationName: APPLICATION_NAME,
        authors: [DEFAULT_AUTHOR],
        creator: DEFAULT_AUTHOR.name,
        description,
        formatDetection: {
            telephone: false,
        },
        metadataBase: new URL(BASE_URL),
        openGraph: {
            description,
            images: image
                ? [
                      {
                          alt: title,
                          url: image,
                          ...DEFAULT_IMAGE_DIMENSIONS,
                      },
                  ]
                : undefined,
            locale: 'en_US',
            siteName: APPLICATION_NAME,
            title: title,
            type: 'website',
        },
        publisher: DEFAULT_AUTHOR.name,
        title: title,
        twitter: {
            card: 'summary_large_image',
            creator: TWITTER_HANDLE,
        },
        verification: {
            google: env.GOOGLE_VERIFICATION,
        },
    };

    // Merge baseMetadata with additionalMetadata using spread syntax
    return {
        ...baseMetadata,
        ...additionalMetadata,
        openGraph: {
            ...baseMetadata.openGraph,
            ...additionalMetadata.openGraph,
        },
        twitter: {
            ...baseMetadata.twitter,
            ...additionalMetadata.twitter,
        },
    };
}
