import Link from "next/link";

type Link = {
    name: string;
    href: string;
};

const links: Link[] = [
    {
        name: "Home",
        href: "/",
    },
    {
        name: "Projects",
        href: "/projects",
    },
    {
        name: "Posts",
        href: "/posts/1",
    },
];

export function Header() {
    return (
        <header className="container mt-8">
            <nav>
                <ul className="flex gap-4">
                    {links.map((link) => (
                        <li key={link.name}>
                            <Link
                                href={link.href}
                                className="text-sm text-muted-foreground transition-opacity hover:opacity-85"
                            >
                                {link.name}
                            </Link>
                        </li>
                    ))}
                </ul>
            </nav>
        </header>
    );
}
