import { author } from '@/data/author';
import { cn } from '@/utils/cn';
import Link from 'next/link';
import { FlowbiteDiscordSolid } from '../icons/FlowbiteDiscordSolid';
import { FlowbiteGithubSolid } from '../icons/FlowbiteGithubSolid';
import { FlowbiteInstagramSolid } from '../icons/FlowbiteInstagramSolid';
import { FlowbiteMailBoxSolid } from '../icons/FlowbiteMailBoxSolid';

const navs = [
    { name: 'About', href: '/' },
    { name: 'Music', href: '/music' },
    { name: 'Posts', href: '/posts' },
    { name: 'Archive', href: '/posts/archive' },
    { name: 'Categories', href: '/posts/categories' },
];

const socials = [
    { name: 'Email', href: `mailto:${author.socials.email}`, icon: FlowbiteMailBoxSolid },
    { name: 'GitHub', href: author.socials.github, icon: FlowbiteGithubSolid },
    { name: 'Discord', href: author.socials.discord, icon: FlowbiteDiscordSolid },
    { name: 'Instagram', href: author.socials.instagram, icon: FlowbiteInstagramSolid },
];

export function HeaderComponent() {
    return (
        <header className="flex justify-between items-center md:items-start flex-col flex-grow w-full">
            <Link href="/" prefetch={false} className="normal">
                <hgroup
                    className={cn(
                        'w-full md:w-fit text-center md:text-start font-extrabold',
                        'cursor-pointer md:px-[10px] md:pb-[45px] md:writing-vertical-right items-start',
                        'md:border-l-2 border-l-foreground',
                        'transition-all duration-800 ease-in-out',
                        'md:hover:bg-foreground md:hover:text-background md:hover:pt-[15px] md:hover:pb-[calc(45px-15px)]',
                    )}
                >
                    <h3 className="text-lg md:text-xl font-serif mt-2">{author.name.en}</h3>
                    <h1 className="text-2xl md:text-3xl font-serifjp">{author.name.jp}</h1>
                </hgroup>
            </Link>

            <nav className="font-semibold flex flex-col gap-4 items-center md:items-start">
                <ul className="flex md:flex-col gap-2 md:gap-0">
                    {navs.map((navItem) => (
                        <li key={navItem.name} className="text-base md:text-md">
                            <Link href={navItem.href} prefetch={false}>
                                {navItem.name}
                            </Link>
                        </li>
                    ))}
                </ul>
                <ul className="gap-1 flex">
                    {socials.map((social) => (
                        <li key={social.name}>
                            <Link
                                href={social.href}
                                target="_blank"
                                rel="noopener noreferrer"
                                aria-label={social.name}
                                prefetch={false}
                                className="normal"
                            >
                                <social.icon
                                    className="w-5 h-5 hover:text-foreground/85 transition"
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
