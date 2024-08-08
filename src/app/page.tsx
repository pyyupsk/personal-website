import { List as PostsList } from "@/components/post/list";
import { ProfileCard } from "@/components/profile-card";
import { List as ProjectsList } from "@/components/project/list";

export default function Page() {
    return (
        <div className="flex flex-col my-12 container">
            <ProfileCard />
            <ProjectsList />
            <PostsList />
        </div>
    );
}
