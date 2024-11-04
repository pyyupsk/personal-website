import { api, HydrateClient } from '@/trpc/server';

import { Footer } from './_components/footer';
import { Header } from './_components/header';

const Layout = async ({ children }: { children: React.ReactNode }) => {
    await api.projects.list();
    await api.posts.list({});

    return (
        <HydrateClient>
            <Header />
            <main className="container grow py-6">{children}</main>
            <Footer />
        </HydrateClient>
    );
};

export default Layout;
