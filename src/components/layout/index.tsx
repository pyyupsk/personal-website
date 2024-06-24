import { Footer } from './footer';
import { Header } from './header';

export default function Layout({ children }: { children: React.ReactNode }) {
    return (
        <div className="flex flex-row-reverse justify-between gap-[1.875rem] px-8 container contain-layout">
            <div className="sticky top-0 bottom-0 h-screen py-20 px-8 min-w-64 max-w-64 flex flex-col justify-between items-start gap-[1.875rem]">
                <Header />
                <Footer />
            </div>
            <main className="py-20 w-full px-8">{children}</main>
        </div>
    );
}
