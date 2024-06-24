import type { Metadata } from 'next';
import '@/styles/globals.css';
import Layout from '@/components/layout';
import { ThemeProvider } from '@/components/theme-provider';
import { fontSans, fontSerif, fontSerifJP } from '@/fonts';
import { cn } from '@/utils/cn';

export const metadata: Metadata = {
    title: 'Next.js Template',
    description: 'Next.js template by @Zylo23',
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
