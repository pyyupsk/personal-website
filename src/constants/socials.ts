import { DiscordIcon } from "@/components/icons/discord";
import { AtSignIcon, GithubIcon, InstagramIcon } from "lucide-react";

type Social = {
    name: string;
    href: string;
    icon: React.FC<React.SVGProps<SVGSVGElement>>;
};

export const socials: Social[] = [
    {
        name: "Email",
        href: "mailto:pyyupsk@proton.me",
        icon: AtSignIcon,
    },
    {
        name: "GitHub",
        href: "https://github.com/pyyupsk",
        icon: GithubIcon,
    },
    {
        name: "Discord",
        href: "https://discord.com/users/1226475144554483734",
        icon: DiscordIcon,
    },
    {
        name: "Instagram",
        href: "https://instagram.com/pyyupsk",
        icon: InstagramIcon,
    },
];
