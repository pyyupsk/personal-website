type Navigation = {
    href: string;
    match: (_pathname: string) => boolean;
    name: string;
};

export const navigation: Navigation[] = [
    {
        href: '/',
        match: (pathname: string) => pathname === '/',
        name: 'About',
    },
    {
        href: '/projects',
        match: (pathname: string) => pathname.startsWith('/projects'),
        name: 'Projects',
    },
    {
        href: '/posts/1',
        match: (pathname: string) => pathname.startsWith('/posts/'),
        name: 'Posts',
    },
    {
        href: '/reviews',
        match: (pathname: string) => pathname.startsWith('/reviews'),
        name: 'Reviews',
    },
];
