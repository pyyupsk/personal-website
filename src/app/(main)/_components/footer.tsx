'use client';

import type { Route } from 'next';

import { ThemeSwitcher } from '@/components/theme-switcher';
import { navigation } from '@/constants/navigation';
import { socials } from '@/constants/socials';
import { cn } from '@/lib/utils';
import { usePathname } from 'next/navigation';
import { Link } from 'next-view-transitions';

export function Footer() {
    const pathname = usePathname();
    const currentYear = new Date().getFullYear();
    const startYear = 2024;
    const copyrightYearRange =
        currentYear === startYear ? String(startYear) : `${startYear}-${currentYear}`;

    return (
        <footer className="container border-t bg-background py-6 sm:pb-20">
            <div className="flex items-center justify-between gap-3">
                <p className="text-sm text-muted-foreground">
                    © {copyrightYearRange} First, All rights reserved.
                </p>
                <ThemeSwitcher />
            </div>
            <nav className="mt-3 flex items-center justify-between">
                <ul className="flex gap-3">
                    {socials.map((item) => (
                        <li key={item.name}>
                            <a href={item.href} rel="noreferrer" target="_blank">
                                <item.icon className="size-4 text-muted-foreground transition-all duration-200 hover:text-foreground" />
                                <span className="sr-only">{item.name}</span>
                            </a>
                        </li>
                    ))}
                </ul>
                <ul className="flex gap-3">
                    {navigation.map((item) => (
                        <li className="text-sm" key={item.name}>
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
        </footer>
    );
}
