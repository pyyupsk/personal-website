import { author } from '@/data/author';
import Link from 'next/link';

export function Footer() {
    const year = new Date().getFullYear();

    return (
        <footer className="text-sm font-semibold flex flex-col gap-2">
            <p>
                &copy; {year}
                <Link href="/" className="ml-1 font-serif">
                    {author.name.en} ({author.name.jp})
                </Link>
            </p>
            <p>
                Inspired by{' '}
                <Link
                    href="https://github.com/sumimakito/hexo-theme-typography"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    Hexo Typography
                </Link>
            </p>
            <p>
                Our color theme utilizes{' '}
                <Link href="https://github.com/pyyupsk/Koyou" target="_blank" rel="noopener noreferrer">
                    Koyou
                </Link>
            </p>
        </footer>
    );
}
