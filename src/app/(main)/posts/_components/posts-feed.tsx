import { buttonVariants } from "@/components/ui/button";
import { EmptyState } from "@/components/ui/empty-state";
import { prisma } from "@/lib/prisma";
import { $Enums } from "@prisma/client";
import { RssIcon } from "lucide-react";
import Link from "next/link";
import { PostsList } from "./posts-list";

export async function PostsFeed({ page }: { page: number }) {
    const total = await prisma.post.count();
    const posts = await prisma.post.findMany({
        where: {
            status: $Enums.PostStatus.PUBLISHED,
        },
        take: 5,
        skip: (page - 1) * 5,
        orderBy: {
            publishDate: "desc",
        },
        select: {
            id: true,
            title: true,
            description: true,
            publishDate: true,
        },
    });

    if (posts.length === 0) {
        return (
            <EmptyState
                title="No Posts Yet"
                description="It looks like there are no posts to display right now. Check back later for updates!"
                icon={RssIcon}
            >
                <Link href="/posts/1" className={buttonVariants({ variant: "outline" })}>
                    Explore Posts
                </Link>
            </EmptyState>
        );
    }

    return <PostsList posts={posts} page={page} total={total} />;
}
