import { prisma } from "@/lib/prisma";
import { $Enums, Post } from "@prisma/client";
import { Languages } from "next/dist/lib/metadata/types/alternative-urls-types";

const BASE_URL = "https://pyyupsk.vercel.app";

type Sitemap = {
    url: string;
    lastModified?: string | Date;
    changeFrequency?: "always" | "hourly" | "daily" | "weekly" | "monthly" | "yearly" | "never";
    priority?: number;
    alternates?: {
        languages?: Languages<string>;
    };
};

export default async function sitemap(): Promise<Sitemap[]> {
    const posts = await prisma.post.findMany({
        where: { status: $Enums.PostStatus.PUBLISHED },
        select: { id: true },
        cacheStrategy: { ttl: 3600 },
    });

    const homePage = generatePageMetadata(BASE_URL, "weekly");
    const projectsPage = generatePageMetadata(`${BASE_URL}/projects`, "weekly");

    const allPosts = generatePostsMetadata(posts);
    const allPost = generatePostMetadata(posts);

    return [homePage, projectsPage, ...allPosts, ...allPost];
}

function generatePageMetadata(url: string, changeFrequency: Sitemap["changeFrequency"]): Sitemap {
    return {
        url,
        lastModified: new Date(),
        priority: 1.0,
        changeFrequency,
    };
}

function generatePostsMetadata(posts: { id: Post["id"] }[]): Sitemap[] {
    const pages: number = Math.ceil(posts.length / 5);

    return Array.from({ length: pages }, (_, i) => {
        const page = i + 1;
        return generatePageMetadata(`${BASE_URL}/posts/${page}`, "weekly");
    });
}

function generatePostMetadata(posts: { id: Post["id"] }[]): Sitemap[] {
    return posts.map(({ id }) => ({
        url: `${BASE_URL}/post/${id}`,
        lastModified: new Date(),
        priority: 0.64,
        changeFrequency: "daily",
    }));
}
