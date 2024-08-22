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
