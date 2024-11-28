import { generateMetadata } from '@/lib/metadata';
import { openGraph } from '@/lib/open-graph';

export const metadata = generateMetadata({
    description:
        'Self-taught developer with a focus on Node.js and web solutions. Explore my projects and insights on my website. Passionate about creating efficient, scalable, and user-friendly solutions.',
    image: openGraph({
        badge: 'Bio',
        button: 'Visit My Portfolio',
        description:
            'Pongsakorn Thipayanate is an independent programmer specializing in Node.js and web development. Check out his portfolio for projects and insights.',
        title: 'P. Thipayanate',
    }),
    title: 'Pongsakorn Thipayanate | Independent Programmer',
});

export default function Layout({ children }: { children: React.ReactNode }) {
    return <div className="grid h-screen place-items-center">{children}</div>;
}
