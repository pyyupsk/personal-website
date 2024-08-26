import { EditIcon, Home, MessageCircleIcon, ProjectorIcon } from "lucide-react";

type Navigation = {
    name: string;
    href: string;
    icon: React.ElementType;
};

export const navigation: Navigation[] = [
    { name: "Dashboard", href: "/dashboard", icon: Home },
    { name: "Posts", href: "/dashboard/posts", icon: EditIcon },
    { name: "Projects", href: "/dashboard/projects", icon: ProjectorIcon },
    { name: "Comments", href: "/dashboard/comments", icon: MessageCircleIcon },
];
