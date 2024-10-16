'use client';

import { navigation } from '@/constants/navigation';
import { socials } from '@/constants/socials';
import { usePathname } from 'next/navigation';
import { Link } from 'next-view-transitions';

import { ThemeSwitcher } from '../../../components/theme-switcher';

export function Footer() {
    const pathname = usePathname();
    const currentYear = new Date().getFullYear();
    const startYear = 2024;
    const copyrightYearRange =
        currentYear === startYear ? String(startYear) : `${startYear}-${currentYear}`;

    return (
        <footer className="container border-t bg-background py-6 sm:pb-20">
            <div className="flex items-center justify-between gap-3">
                <p className="text-sm">© {copyrightYearRange} First, All rights reserved.</p>
                <ThemeSwitcher />
            </div>
            <nav className="mt-3 flex items-center justify-between">
                <ul className="flex gap-3">
                    {socials.map((item) => (
                        <li key={item.name}>
                            <Link href={item.href} target="_blank">
                                <item.icon className="size-4 text-muted-foreground transition-all duration-200 hover:text-foreground" />
                                <span className="sr-only">{item.name}</span>
                            </Link>
                        </li>
                    ))}
                </ul>
                <ul className="flex gap-3">
                    {navigation.map((item) => (
                        <li className="text-sm" key={item.name}>
                            <Link aria-current={item.href === pathname} href={item.href}>
                                {item.name}
                            </Link>
                        </li>
                    ))}
                </ul>
            </nav>
        </footer>
    );
}
