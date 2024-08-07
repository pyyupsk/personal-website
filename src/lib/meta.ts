import { author } from "@/config/personal";
import { BASE_URL } from "@/constants";
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
        authors: [{ name: author, url: BASE_URL }],
        metadataBase: new URL(BASE_URL),
        openGraph: {
            title,
            description,
            url: BASE_URL,
            images: [
                {
                    url: `${BASE_URL}/og.jpg`,
                    width: 800,
                    height: 600,
                },
            ],
        },
    };
}
