import { author } from '@/data/author';
import { cn } from '@/utils/cn';
import Link from 'next/link';
import { FlowbiteDiscordSolid } from '../icons/FlowbiteDiscordSolid';
import { FlowbiteGithubSolid } from '../icons/FlowbiteGithubSolid';
import { FlowbiteInstagramSolid } from '../icons/FlowbiteInstagramSolid';

const navs = [
    { name: 'About', href: '/' },
    { name: 'Posts', href: '/posts' },
    { name: 'Archive', href: '/archive' },
    { name: 'Categories', href: '/categories' },
];

const socials = [
    { name: 'GitHub', href: author.socials.github, icon: FlowbiteGithubSolid },
    { name: 'Discord', href: author.socials.discord, icon: FlowbiteDiscordSolid },
    { name: 'Instagram', href: author.socials.instagram, icon: FlowbiteInstagramSolid },
];

export function HeaderComponent() {
    return (
        <header className="flex justify-between items-start flex-col flex-grow">
            <hgroup
                className={cn(
                    'cursor-pointer px-[10px] pb-[45px] writing-vertical-right items-start border-l-2 border-l-foreground group',
                    'transition-all duration-800 ease-in-out',
                    'hover:bg-foreground hover:pt-[15px] hover:pb-[calc(45px-15px)]',
                )}
            >
                <Link href="/" className="font-bold group-hover:text-background normal">
                    <h3 className="text-xl font-serif mt-2">{author.name.en}</h3>
                    <h1 className="text-4xl font-serifjp">{author.name.jp}</h1>
                </Link>
            </hgroup>

            <nav className="font-bold flex flex-col gap-4">
                <ul>
                    {navs.map((navItem) => (
                        <li key={navItem.name} className="text-lg">
                            <Link href={navItem.href}>{navItem.name}</Link>
                        </li>
                    ))}
                </ul>
                <ul className="space-x-1 flex">
                    {socials.map((social) => (
                        <li key={social.name}>
                            <Link
                                href={social.href}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="normal"
                                aria-label={social.name}
                            >
                                <social.icon
                                    className="w-5 h-5 hover:text-foreground/90 transition"
                                    aria-hidden="true"
                                />
                            </Link>
                        </li>
                    ))}
                </ul>
            </nav>
        </header>
    );
}
