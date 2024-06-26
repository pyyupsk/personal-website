import { author } from '@/data/author';
import { cn } from '@/utils/cn';

export function FooterComponent({ className }: { className?: string }) {
    const currentYear = new Date().getFullYear();
    const {
        name: { en: authorNameEn, jp: authorNameJp },
    } = author;

    return (
        <footer className={cn('text-sm font-semibold w-full flex md:flex-col gap-2 flex-wrap', className)}>
            <p>
                &copy; {currentYear} {authorNameEn} ({authorNameJp})
            </p>
            <p>
                Inspired by{' '}
                <a
                    href="https://github.com/sumimakito/hexo-theme-typography"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="no-after"
                >
                    Hexo Typography
                </a>
            </p>
        </footer>
    );
}
