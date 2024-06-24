import type { Metadata } from 'next';
import '@/styles/globals.css';
import { Layout } from '@/components/layout';
import { ThemeProvider } from '@/components/theme-provider';
import { author } from '@/data/author';
import { fontSans, fontSerif, fontSerifJP } from '@/fonts';
import { cn } from '@/utils/cn';

const TITLE = author.name.jp;
const DESCRIPTION = `👋 Hello! I'm ${author.name.jp}, a passionate full-stack developer with a passionate about creating innovative solutions that have a positive impact on people's lives.`;
const BASE_URL = 'https://pyyupsk.is-a.dev';

export const metadata: Metadata = {
    title: {
        template: `${TITLE} - %s`,
        default: TITLE,
    },
    description: DESCRIPTION,
    authors: [
        {
            name: author.name.jp,
            url: BASE_URL,
        },
    ],
    metadataBase: new URL(BASE_URL),
    openGraph: {
        title: {
            template: `${TITLE} - %s`,
            default: TITLE,
        },
        description: DESCRIPTION,
        url: BASE_URL,
        images: [
            {
                url: `${BASE_URL}/opengraph.png`,
                width: 800,
                height: 600,
            },
        ],
    },
};

const RootLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <html lang="en">
            <body
                className={cn(
                    'bg-background font-sans antialiased min-h-screen',
                    fontSans.variable,
                    fontSerif.variable,
                    fontSerifJP.variable,
                )}
            >
                <ThemeProvider attribute="class" defaultTheme="system" disableTransitionOnChange>
                    <Layout>{children}</Layout>
                </ThemeProvider>
            </body>
        </html>
    );
};

export default RootLayout;
