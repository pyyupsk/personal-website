import { FooterComponent } from './footer';
import { HeaderComponent } from './header';

export function Layout({ children }: { children: React.ReactNode }) {
    return (
        <div className="flex flex-row-reverse justify-between gap-8 px-8 container">
            <aside className="sticky top-0 bottom-0 h-screen py-20 px-8 min-w-64 max-w-64 flex flex-col justify-between items-start gap-8">
                <HeaderComponent />
                <FooterComponent />
            </aside>
            <main className="py-20 w-full px-8">{children}</main>
        </div>
    );
}
