type Navigation = {
    href: string;
    // eslint-disable-next-line no-unused-vars
    match?: (pathname: string) => boolean;
    name: string;
};

export const navigation: Navigation[] = [
    {
        href: '/',
        match: (pathname) => pathname === '/',
        name: 'About',
    },
    {
        href: '/projects',
        match: (pathname) => pathname.startsWith('/projects'),
        name: 'Projects',
    },
    {
        href: '/posts/1',
        match: (pathname) => pathname.startsWith('/posts/'),
        name: 'Posts',
    },
    {
        href: '/reviews',
        match: (pathname) => pathname.startsWith('/reviews'),
        name: 'Reviews',
    },
];
