import { AtSignIcon, GithubIcon, InstagramIcon } from "lucide-react";
import Link from "next/link";
import { DiscordIcon } from "../icons/discord";
import { ThemeSwitcher } from "../theme-switcher";

type Social = {
    name: string;
    href: string;
    icon: React.FC<React.SVGProps<SVGSVGElement>>;
};

const socials: Social[] = [
    {
        name: "Email",
        href: "mailto:support@vercel.com",
        icon: AtSignIcon,
    },
    {
        name: "GitHub",
        href: "https://github.com/vercel",
        icon: GithubIcon,
    },
    {
        name: "Discord",
        href: "https://discord.gg/vercel",
        icon: DiscordIcon,
    },
    {
        name: "Instagram",
        href: "https://instagram.com/vercel",
        icon: InstagramIcon,
    },
];

type Navigation = {
    name: string;
    href: string;
};

const navigation: Navigation[] = [
    {
        name: "Home",
        href: "/",
    },
    {
        name: "About",
        href: "/about",
    },
    {
        name: "Projects",
        href: "/projects",
    },
    {
        name: "Blog",
        href: "/blog",
    },
];

export function Footer() {
    return (
        <footer className="border-t bg-background py-6">
            <div className="container flex flex-col items-center justify-between gap-3 md:flex-row">
                <p className="text-sm text-muted-foreground">
                    © 2024 Pongsakorn Thipayanate. All rights reserved.
                </p>
                <ThemeSwitcher />
            </div>
            <div className="container mt-3">
                <ul className="flex items-center justify-between">
                    <li className="flex gap-3">
                        {socials.map((item) => (
                            <Link key={item.name} href={item.href}>
                                <item.icon className="h-4 w-4 text-muted-foreground hover:text-foreground transition-all duration-200" />
                                <span className="sr-only">{item.name}</span>
                            </Link>
                        ))}
                    </li>
                    <li className="flex gap-3">
                        {navigation.map((item) => (
                            <Link
                                key={item.name}
                                href={item.href}
                                className="text-sm text-muted-foreground hover:text-foreground transition-all duration-100"
                            >
                                {item.name}
                            </Link>
                        ))}
                    </li>
                </ul>
            </div>
        </footer>
    );
}
