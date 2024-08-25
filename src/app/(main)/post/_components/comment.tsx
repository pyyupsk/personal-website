import { auth } from "@/lib/auth";
import { Suspense } from "react";
import { CommentField } from "./comment-field";
import { CommentList } from "./comment-list";
import { CommentSkeleton } from "./comment-skeleton";

export async function Comment({ postId }: { postId: string }) {
    const session = await auth();

    return (
        <div className="max-w-2xl mx-auto mt-8 space-y-4">
            <CommentField postId={postId} user={session?.user} />
            <Suspense fallback={<CommentSkeleton count={2} />}>
                <CommentList postId={postId} />
            </Suspense>
        </div>
    );
}