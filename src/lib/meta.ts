import { type Metadata } from 'next/dist/lib/metadata/types/metadata-interface';
import { type TemplateString } from 'next/dist/lib/metadata/types/metadata-types';

type CommonMetaData = {
    description: string;
    image: string;
    title: string | TemplateString;
};

export function commonMetaData({ description, image, title }: CommonMetaData): Metadata {
    return {
        authors: [{ name: '@pyyupsk' }],
        description,
        metadataBase: new URL('https://pyyupsk.vercel.app'),
        openGraph: {
            description,
            images: [
                {
                    height: 630,
                    url: image,
                    width: 1200,
                },
            ],
            title,
        },
        robots: {
            follow: true,
            googleBot: {
                follow: false,
                index: true,
                'max-image-preview': 'large',
                'max-snippet': -1,
                'max-video-preview': -1,
                noimageindex: true,
            },
            index: false,
            nocache: true,
        },
        title,
    };
}
