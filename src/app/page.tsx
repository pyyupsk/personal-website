import { List as PostsList } from "@/components/post/list";
import { ProfileCard } from "@/components/profile-card";
import { List as ProjectsList } from "@/components/project/list";
import { Fragment } from "react";

export default function Page() {
    return (
        <Fragment>
            <ProfileCard />
            <ProjectsList />
            <PostsList />
        </Fragment>
    );
}
