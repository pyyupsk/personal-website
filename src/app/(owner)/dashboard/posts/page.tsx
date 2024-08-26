import { Button } from '@/components/ui/button';
import { PlusCircle } from 'lucide-react';
import { PostsFeed } from './_components/posts-feed';
import { PostsFilter } from './_components/posts-filter';

export default function Page() {
    return (
        <>
            <div className="mb-6 flex items-center justify-between">
                <h1 className="text-2xl font-bold">Blog Posts</h1>
                <Button>
                    <PlusCircle className="mr-2 size-4" />
                    New Post
                </Button>
            </div>
            <PostsFilter />
            <PostsFeed />
        </>
    );
}
