"use client";

import { navigation } from "@/constants/navigation";
import { socials } from "@/constants/socials";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ThemeSwitcher } from "../theme-switcher";

export function Footer() {
    const pathname = usePathname();

    return (
        <footer className="border-t bg-background py-6 container">
            <div className="flex flex-col items-center justify-between gap-3 md:flex-row">
                <p>© 2024 &mdash; All rights reserved.</p>
                <ThemeSwitcher />
            </div>
            <div className="mt-3">
                <div className="flex items-center justify-between">
                    <ul className="flex gap-3">
                        {socials.map((item) => (
                            <li key={item.name}>
                                <Link href={item.href} target="_blank">
                                    <item.icon className="h-4 w-4 text-muted-foreground hover:text-foreground transition-all duration-200" />
                                    <span className="sr-only">{item.name}</span>
                                </Link>
                            </li>
                        ))}
                    </ul>
                    <ul className="flex gap-3">
                        {navigation.map((item) => (
                            <li key={item.name}>
                                <Link href={item.href} aria-selected={item.href === pathname}>
                                    {item.name}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </footer>
    );
}
