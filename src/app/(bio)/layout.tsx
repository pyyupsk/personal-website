import { commonMetaData } from '@/lib/meta';

export function generateMetadata() {
    const metaData = commonMetaData({
        description:
            'Meet Pongsakorn Thipayanate, a self-taught coder passionate about Node.js and web development. Explore my projects, blog, and connect via GitHub, Twitter, or email.',
        title: 'Pongsakorn Thipayanate | Programmer & Web Developer',
    });

    return metaData;
}

export default function Layout({ children }: { children: React.ReactNode }) {
    return <div className="grid h-screen place-items-center">{children}</div>;
}
