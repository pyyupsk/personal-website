import { env } from "@/env";
import { prisma } from "@/utils/prisma";
import { Posts } from "@prisma/client";
import Link from "next/link";
import { buttonVariants } from "../ui/button";
import { Separator } from "../ui/separator";
import { Card } from "./card";

const LIMIT: number = 5;

const prod: boolean = env.NODE_ENV === "production";

export async function List() {
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

    return (
        <div className="my-8 space-y-4">
            <h1>
                Latest Posts ({posts.length}/{total})
            </h1>
            <Separator />
            <div className="flex flex-col gap-2">
                {posts.map((post) => (
                    <Card key={post.id} post={post} />
                ))}
            </div>
            {posts.length < LIMIT && (
                <div className="flex justify-end">
                    <Link
                        href="/post/1"
                        className={buttonVariants({ variant: "outline", size: "sm" })}
                    >
                        View all posts
                    </Link>
                </div>
            )}
        </div>
    );
}
