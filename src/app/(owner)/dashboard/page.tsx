import { RecentPosts } from './_components/recent/posts';
import { RecentProjects } from './_components/recent/projects';
import { Status } from './_components/status';

export default function Page() {
    return (
        <>
            <h1>Overview</h1>
            <Status />
            <div className="mt-8 grid grid-cols-1 gap-4 lg:grid-cols-2">
                <RecentProjects />
                <RecentPosts />
            </div>
        </>
    );
}
