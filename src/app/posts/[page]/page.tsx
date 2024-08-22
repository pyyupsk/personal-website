import { commonMetaData } from "@/lib/meta";
import { Suspense } from "react";
import { PostsFeed } from "../_components/posts-feed";
import { Skeleton } from "../_components/skeleton";

export function generateMetadata() {
    const metaData = commonMetaData({
        title: "First's Blog – Insights & Experiences from a Dedicated Programmer",
        description:
            "Read First's latest blog posts on programming, reverse engineering, and personal growth. Dive into a journey of coding challenges, solutions, and knowledge-sharing.",
    });

    return metaData;
}

export default async function Page({ params }: { params: { page: string } }) {
    return (
        <Suspense fallback={<Skeleton count={5} />}>
            <PostsFeed page={parseInt(params.page)} />
        </Suspense>
    );
}
