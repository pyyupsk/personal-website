import { Card } from "@/components/post/card";
import {
    Pagination as BasePagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "@/components/ui/pagination";
import { Separator } from "@/components/ui/separator";
import { env } from "@/env";
import { cn } from "@/lib/utils";
import { prisma } from "@/utils/prisma";
import { Posts } from "@prisma/client";

const LIMIT: number = 10;

const prod: boolean = env.NODE_ENV === "production";

export default async function Page({ params }: { params: { page: string } }) {
    const [posts, total] = await Promise.all([
        prod
            ? prisma.posts.findMany({
                  orderBy: { createdAt: "desc" },
                  take: LIMIT,
                  where: { published: true },
              })
            : Array<Posts>(),
        prod ? prisma.posts.count() : Promise.resolve(0),
    ]);

    const current: number = parseInt(params.page);
    const pages: number = Math.ceil(total / LIMIT);

    return (
        <div className="flex flex-col my-12 container">
            <div className="my-8 space-y-4">
                <h1>Posts</h1>
                <Separator />
                <div className="flex flex-col gap-2">
                    {posts.map((post) => (
                        <Card key={post.id} post={post} />
                    ))}
                </div>
                <Pagination current={current} pages={pages} />
            </div>
        </div>
    );
}

function Pagination({ current, pages }: { current: number; pages: number }) {
    return (
        <BasePagination className={cn({ hidden: pages < 2 })}>
            <PaginationContent>
                {current > 1 && (
                    <PaginationItem>
                        <PaginationPrevious href={`/post/${current - 1}`} />
                    </PaginationItem>
                )}
                {current > 2 && (
                    <PaginationItem>
                        <PaginationEllipsis />
                    </PaginationItem>
                )}
                {Array.from({ length: pages }).map((_, index) => (
                    <PaginationItem key={index}>
                        <PaginationLink
                            href={`/post/${index + 1}`}
                            isActive={index + 1 === current}
                        >
                            {index + 1}
                        </PaginationLink>
                    </PaginationItem>
                ))}
                {current < pages - 1 && (
                    <PaginationItem>
                        <PaginationEllipsis />
                    </PaginationItem>
                )}
                {current < pages && (
                    <PaginationItem>
                        <PaginationNext href={`/post/${current + 1}`} />
                    </PaginationItem>
                )}
            </PaginationContent>
        </BasePagination>
    );
}
