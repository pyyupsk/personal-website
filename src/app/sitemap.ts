import { BASE_URL } from "@/constants";
import { prisma } from "@/utils/prisma";
import { Posts } from "@prisma/client";
import { Languages } from "next/dist/lib/metadata/types/alternative-urls-types";

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
    const posts = await prisma.posts.findMany({
        where: { published: true },
        select: { id: true, updatedAt: true },
    });

    const homePage = generatePageMetadata(BASE_URL, "weekly");
    const postsPage = generatePageMetadata(`${BASE_URL}/posts`, "daily");

    const allPosts = generatePostsMetadata(posts);

    return [homePage, postsPage, ...allPosts];
}

function generatePageMetadata(url: string, changeFrequency: Sitemap["changeFrequency"]): Sitemap {
    return {
        url,
        lastModified: new Date(),
        priority: 1.0,
        changeFrequency,
    };
}

function generatePostsMetadata(
    posts: { id: Posts["id"]; updatedAt: Posts["updatedAt"] }[],
): Sitemap[] {
    return posts.map(({ id, updatedAt }) => ({
        url: `${BASE_URL}/post/${id}`,
        lastModified: new Date(updatedAt),
        priority: 0.64,
        changeFrequency: "daily",
    }));
}
