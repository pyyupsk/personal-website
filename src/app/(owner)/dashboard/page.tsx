import { RecentPosts } from "./_components/recent/posts";
import { RecentProjects } from "./_components/recent/projects";
import { Status } from "./_components/status";

export default function Page() {
    return (
        <>
            <div className="flex items-center">
                <h1>Overview</h1>
            </div>
            <Status />
            <div className="grid gap-4 grid-cols-1 lg:grid-cols-2 mt-8">
                <RecentProjects />
                <RecentPosts />
            </div>
        </>
    );
}
