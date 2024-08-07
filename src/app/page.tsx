import { PostsList } from "@/components/posts-list";
import { ProfileCard } from "@/components/profile-card";
import { ProjectsList } from "@/components/projects-list";

export default async function Page() {
    return (
        <div className="flex flex-col my-12 container">
            <ProfileCard />
            <ProjectsList />
            <PostsList />
        </div>
    );
}
