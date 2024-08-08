import { Button } from "@/components/ui/button";
import { env } from "@/env";
import { prisma } from "@/utils/prisma";
import { SignInButton } from "@clerk/nextjs";
import { currentUser } from "@clerk/nextjs/server";
import { Posts } from "@prisma/client";
import { Card } from "./card";
import { Form } from "./form";

const prod: boolean = env.NODE_ENV === "production";

export async function Comment({ postId }: { postId: Posts["id"] }) {
    const user = await currentUser();

    const comments = prod ? await prisma.comments.findMany({ where: { postId }, take: 5 }) : [];

    return (
        <div className="space-y-6 relative">
            <div className="space-y-2">
                <h2>Comments</h2>
                <p className="text-sm text-muted-foreground">
                    Share your thoughts and feedback on this article.
                </p>
            </div>
            <Form postId={postId} />
            <div className="grid gap-4">
                {comments.map((comment) => (
                    <Card key={comment.id} comment={comment} />
                ))}
            </div>
            {!user && (
                <div className="absolute inset-0">
                    <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent" />
                    <div className="absolute inset-0 flex items-center justify-center">
                        <div className="flex flex-col items-center justify-center space-y-4 bg-card border rounded p-6">
                            <p className="text-center text-sm text-muted-foreground">
                                You need to be logged in to comment.
                            </p>
                            <SignInButton>
                                <Button variant="secondary">Sign In</Button>
                            </SignInButton>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
