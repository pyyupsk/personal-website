import { EditIcon, Home, MessageCircleIcon, ProjectorIcon } from 'lucide-react';

type Navigation = {
    href: string;
    icon: React.ElementType;
    name: string;
};

export const navigation: Navigation[] = [
    { href: '/dashboard', icon: Home, name: 'Dashboard' },
    { href: '/dashboard/posts', icon: EditIcon, name: 'Posts' },
    { href: '/dashboard/projects', icon: ProjectorIcon, name: 'Projects' },
    { href: '/dashboard/comments', icon: MessageCircleIcon, name: 'Comments' },
];
