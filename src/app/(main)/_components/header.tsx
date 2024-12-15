'use client';

import type { Route } from 'next';

import { navigation } from '@/constants/navigation';
import { cn } from '@/lib/utils';
import { Link } from 'next-view-transitions';
import { usePathname } from 'next/navigation';

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
                                href={item.href as Route}
                                prefetch
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
