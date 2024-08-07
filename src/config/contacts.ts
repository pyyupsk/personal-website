import { IconoirDiscord } from "@/components/icons/IconoirDiscord";
import { IconoirGithub } from "@/components/icons/IconoirGithub";
import { IconoirInstagram } from "@/components/icons/IconoirInstagram";
import React from "react";
import { email } from "./personal";

type Contact = {
    type: "contact" | "social";
    name: string;
    url: string;
    icon?: React.ElementType;
};

export const contacts: Contact[] = [
    {
        type: "contact",
        name: "Email",
        url: `mailto:${email}`,
    },
    {
        type: "social",
        name: "Github",
        url: "https://github.com/pyyupsk",
        icon: IconoirGithub,
    },
    {
        type: "social",
        name: "Discord",
        url: "https://discord.com/users/1226475144554483734",
        icon: IconoirDiscord,
    },
    {
        type: "social",
        name: "Instagram",
        url: "https://www.instagram.com/pyyupsk/",
        icon: IconoirInstagram,
    },
];
