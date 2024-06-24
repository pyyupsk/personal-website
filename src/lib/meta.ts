import { BASE_URL } from '@/constants';
import { author } from '@/data/author';
import type { Metadata } from 'next';
import { TemplateString } from 'next/dist/lib/metadata/types/metadata-types';

export const commonMetaData = ({
    title,
    description,
}: {
    title: string | TemplateString;
    description: string;
}): Metadata => ({
    title,
    description,
    authors: [{ name: author.name.jp, url: BASE_URL }],
    metadataBase: new URL(BASE_URL),
    openGraph: {
        title,
        description,
        url: BASE_URL,
        images: [
            {
                url: `${BASE_URL}/opengraph.png`,
                width: 800,
                height: 600,
            },
        ],
    },
});
