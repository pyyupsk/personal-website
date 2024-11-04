'use client';

import { navigation } from '@/constants/navigation';
import { cn } from '@/lib/utils';
import { usePathname } from 'next/navigation';
import { Link } from 'next-view-transitions';

export function Header() {
    const pathname = usePathname();

    return (
        <header className="container flex flex-col items-center justify-between gap-3 pt-12 sm:flex-row sm:pt-20">
            <span className="text-xl font-semibold tracking-tight">P. Thipayanate</span>
            <nav>
                <ul className="flex items-center gap-3">
                    {navigation.map((item) => (
                        <li key={item.name}>
                            <Link
                                className={cn(
                                    'transition-all duration-200 hover:text-foreground',
                                    item.match?.(pathname)
                                        ? 'text-foreground'
                                        : 'text-muted-foreground',
                                )}
                                href={item.href}
                            >
                                {item.name}
                            </Link>
                        </li>
                    ))}
                </ul>
            </nav>
        </header>
    );
}
