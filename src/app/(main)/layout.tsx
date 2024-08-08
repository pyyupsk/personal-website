import { BackToTop } from "@/components/layout/back-to-top";
import { Header } from "@/components/layout/header";
import { Fragment } from "react";

export default function Layout({ children }: Readonly<{ children: React.ReactNode }>) {
    return (
        <Fragment>
            <Header />
            <main className="flex flex-col my-8 container">{children}</main>
            <BackToTop />
        </Fragment>
    );
}

export const revalidate = 3600; // Revalidate at most every 1 hour
