import { commonMetaData } from '@/lib/meta';
import { openGraph } from '@/lib/open-graph';
import { type Metadata } from 'next/dist/lib/metadata/types/metadata-interface';

export const metadata: Metadata = commonMetaData({
    description:
        'Meet Pongsakorn Thipayanate, a self-taught coder passionate about Node.js and web development. Explore my projects, blog, and connect via GitHub, Twitter, or email.',
    image: openGraph({
        button: 'View My Work',
        description:
            'Discover more about Pongsakorn Thipayanate, an independent programmer specializing in Node.js and web solutions.',
        title: 'Pongsakorn Thipayanate',
    }),
    title: 'Pongsakorn Thipayanate | Programmer & Web Developer',
});

export default function Layout({ children }: { children: React.ReactNode }) {
    return <div className="grid h-screen place-items-center">{children}</div>;
}
