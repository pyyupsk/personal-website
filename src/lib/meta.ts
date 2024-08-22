import { Metadata } from "next/dist/lib/metadata/types/metadata-interface";
import { TemplateString } from "next/dist/lib/metadata/types/metadata-types";

type CommonMetaData = {
    title: string | TemplateString;
    description: string;
};

export function commonMetaData({ title, description }: CommonMetaData): Metadata {
    return {
        title,
        description,
        authors: [{ name: "@pyyupsk" }],
        metadataBase: new URL("https://pyyupsk.vercel.app"),
        openGraph: {
            title,
            description,
            images: [
                {
                    url: "/og.jpg",
                    width: 1200,
                    height: 630,
                },
            ],
        },
    };
}
