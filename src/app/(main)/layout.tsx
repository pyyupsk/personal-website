import { Footer } from './_components/footer';
import { Header } from './_components/header';

const Layout = ({ children }: { children: React.ReactNode }) => {
    return (
        <>
            <Header />
            <main className="container grow py-6">{children}</main>
            <Footer />
        </>
    );
};

export default Layout;
