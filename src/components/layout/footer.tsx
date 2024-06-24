import { author } from '@/data/author';

export function FooterComponent() {
    const currentYear = new Date().getFullYear();
    const {
        name: { en: authorNameEn, jp: authorNameJp },
    } = author;

    return (
        <footer className="text-sm font-semibold flex flex-col gap-2">
            <p>
                &copy; {currentYear} {authorNameEn} ({authorNameJp})
            </p>
            <p>
                Inspired by{' '}
                <a href="https://github.com/sumimakito/hexo-theme-typography" target="_blank" rel="noopener noreferrer">
                    Hexo Typography
                </a>
            </p>
            <p>
                Our color theme utilizes{' '}
                <a href="https://github.com/pyyupsk/Koyou" target="_blank" rel="noopener noreferrer">
                    Koyou
                </a>
            </p>
        </footer>
    );
}
