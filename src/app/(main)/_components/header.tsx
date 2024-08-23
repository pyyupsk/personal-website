"use client";

import { navigation } from "@/constants/navigation";
import Link from "next/link";
import { usePathname } from "next/navigation";

export function Header() {
    const pathname = usePathname();

    const page = navigation.find((page) => page.href === pathname);

    return (
        <header className="container flex flex-col items-center justify-between gap-3 md:flex-row pt-20">
            <span className="text-xl font-semibold tracking-tight">{page?.name}</span>
            <ul className="flex items-center gap-3">
                {navigation.map((item) => (
                    <li key={item.name}>
                        <Link href={item.href} aria-current={item.href === pathname}>
                            {item.name}
                        </Link>
                    </li>
                ))}
            </ul>
        </header>
    );
}
