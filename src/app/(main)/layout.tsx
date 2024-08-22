import { Fragment } from "react";
import { Footer } from "./_components/footer";
import { Header } from "./_components/header";

const Layout = ({ children }: { children: React.ReactNode }) => {
    return (
        <Fragment>
            <Header />
            <main className="container flex-1 py-12">{children}</main>
            <Footer />
        </Fragment>
    );
};

export default Layout;
