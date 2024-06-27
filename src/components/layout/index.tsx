import { FooterComponent } from './footer';
import { HeaderComponent } from './header';

export function Layout({ children }: { children: React.ReactNode }) {
    return (
        <div className="flex flex-col md:flex-row-reverse justify-between gap-8 px-8 container items-center md:items-start">
            <aside className="md:sticky top-0 md:h-screen py-6 md:py-20 px-8 min-w-64 md:max-w-64 flex flex-col justify-between items-start gap-8">
                <HeaderComponent />
                <FooterComponent className="hidden md:flex" />
            </aside>
            <main className="md:py-20 w-full md:px-8">{children}</main>
            <FooterComponent className="flex md:hidden py-6" />
        </div>
    );
}
