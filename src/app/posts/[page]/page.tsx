import { Backward } from "@/components/backward";
import { Card } from "@/components/post/card";
import { Pagination } from "@/components/post/pagination";
import { Separator } from "@/components/ui/separator";
import { env } from "@/env";
import { commonMetaData } from "@/lib/meta";
import { prisma } from "@/utils/prisma";
import { Posts } from "@prisma/client";

const LIMIT: number = 10;

const prod: boolean = env.NODE_ENV === "production";

export async function generateMetadata() {
    const title = "Pongsakorn Thipayanate's Blog | Insights from a Full Stack Developer";
    const description =
        "Dive into the latest posts by Pongsakorn Thipayanate, a full-stack developer from Samut Sakhon, Thailand. Discover insights, tutorials, and updates on the latest projects. Stay informed and inspired by following the blog.";

    return commonMetaData({ title, description });
}

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
                <Backward href="/">Back to Home</Backward>
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
