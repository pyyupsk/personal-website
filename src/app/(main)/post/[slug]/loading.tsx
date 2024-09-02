import { Separator } from '@/components/ui/separator';

import { CommentSkeleton } from '../_components/comment-skeleton';
import { PostContentSkeleton } from '../_components/post-skeleton';

export default function Loading() {
    return (
        <section className="space-y-6">
            <PostContentSkeleton />
            <Separator />
            <div className="mx-auto mt-8 max-w-2xl space-y-4">
                <CommentSkeleton count={2} />
            </div>
        </section>
    );
}
