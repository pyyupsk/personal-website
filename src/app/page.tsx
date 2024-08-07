import { List as PostsList } from "@/components/post/list";
import { ProfileCard } from "@/components/profile-card";
import { ProjectsList } from "@/components/projects-list";

export default function Page() {
    return (
        <div className="flex flex-col my-12 container">
            <ProfileCard />
            <ProjectsList />
            <PostsList />
        </div>
    );
}
