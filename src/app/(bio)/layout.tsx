import { commonMetaData } from '@/lib/meta';

export function generateMetadata() {
    const metaData = commonMetaData({
        description:
            'Meet Pongsakorn Thipayanate, a self-taught coder with a passion for Node.js and web development. Explore my portfolio, read my blog, and connect with me on GitHub and Twitter.',
        title: 'Pongsakorn Thipayanate - Self-Taught Programmer & Web Developer',
    });

    return metaData;
}

export default function Layout({ children }: { children: React.ReactNode }) {
    return <div className="grid h-screen place-items-center">{children}</div>;
}
