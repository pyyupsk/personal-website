import { commonMetaData } from "@/lib/meta";
import { Fragment, Suspense } from "react";
import { ProjectsFeed } from "./_components/projects-feed";
import { ProjectsFilter } from "./_components/projects-filter";
import { Skeleton } from "./_components/skeleton";

export function generateMetadata() {
    const metaData = commonMetaData({
        title: "Explore Innovative Development Projects by Pongsakorn Thipayanate",
        description:
            "Discover a portfolio of projects by Pongsakorn First Thipayanate, showcasing expertise in system architecture, security, and scalable solutions. From concept to reality, see how innovative ideas come to life.",
    });

    return metaData;
}

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
