import { HydrateClient } from '@/trpc/server';

import { Footer } from './_components/footer';
import { Header } from './_components/header';

const Layout = async ({ children }: { children: React.ReactNode }) => {
    return (
        <HydrateClient>
            <Header />
            <main className="container grow py-6">{children}</main>
            <Footer />
        </HydrateClient>
    );
};

export default Layout;
