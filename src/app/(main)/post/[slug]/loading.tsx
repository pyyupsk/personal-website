import { Separator } from '@/components/ui/separator';

import { CommentsSkeleton } from '../_components/comments-skeleton';
import { PostContentSkeleton } from '../_components/post-skeleton';

export default function Loading() {
    return (
        <section className="space-y-6">
            <PostContentSkeleton />
            <Separator />
            <div className="mx-auto mt-8 max-w-2xl space-y-4">
                <CommentsSkeleton count={2} />
            </div>
        </section>
    );
}
