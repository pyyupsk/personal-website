import { Suspense } from "react";
import { CommentField } from "./comment-field";
import { CommentList } from "./comment-list";
import { Skeleton } from "./skeleton";

export function CommentContainer({ postId }: { postId: string }) {
    return (
        <div className="max-w-2xl mx-auto mt-8 space-y-4">
            <CommentField postId={postId} />
            <Suspense fallback={<Skeleton count={3} />}>
                <CommentList postId={postId} />
            </Suspense>
        </div>
    );
}
