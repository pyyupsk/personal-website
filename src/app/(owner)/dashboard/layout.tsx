import { Aside } from './_components/layout/aside';
import { Header } from './_components/layout/header';

export default function Layout({ children }: { children: React.ReactNode }) {
    return (
        <div className="min-h-screen">
            <Aside />
            <div className="flex flex-col md:ml-[220px] lg:ml-[280px]">
                <Header />
                <main className="mt-14 flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
                    {children}
                </main>
            </div>
        </div>
    );
}
