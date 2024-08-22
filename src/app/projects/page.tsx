import { Fragment, Suspense } from "react";
import { ProjectsFeed } from "./_components/projects-feed";
import { ProjectsFilter } from "./_components/projects-filter";
import { Skeleton } from "./_components/skeleton";

export default async function Page() {
    return (
        <Fragment>
            <ProjectsFilter />
            <Suspense fallback={<Skeleton count={4} />}>
                <ProjectsFeed />
            </Suspense>
        </Fragment>
    );
}
