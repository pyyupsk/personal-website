'use client';

import { navigation } from '@/constants/navigation';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export function Header() {
    const pathname = usePathname();

    return (
        <header className="container flex items-center justify-between gap-3 pt-20">
            <span className="text-xl font-semibold tracking-tight">Pongsakorn Thipayanate</span>
            <nav>
                <ul className="flex items-center gap-3">
                    {navigation.map((item) => (
                        <li key={item.name}>
                            <Link aria-current={item.href === pathname} href={item.href}>
                                {item.name}
                            </Link>
                        </li>
                    ))}
                </ul>
            </nav>
        </header>
    );
}
