import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";
import { PostsFeed } from "./_components/posts-feed";
import { PostsFilter } from "./_components/posts-filter";

export default function Page() {
    return (
        <>
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold">Blog Posts</h1>
                <Button>
                    <PlusCircle className="mr-2 h-4 w-4" />
                    New Post
                </Button>
            </div>
            <PostsFilter />
            <PostsFeed />
        </>
    );
}
