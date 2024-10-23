import { Separator } from '@/components/ui/separator';

import { PostSkeleton } from '../_components/post-skeleton';

export default function Loading() {
    return (
        <section className="space-y-6">
            <PostSkeleton />
            <Separator />
        </section>
    );
}
