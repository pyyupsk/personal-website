import { ThemeProvider } from '@/components/theme-provider';
import { cn } from '@/lib/utils';
import '@/styles/globals.css';
import { GeistMono } from 'geist/font/mono';
import { GeistSans } from 'geist/font/sans';
import { SessionProvider } from 'next-auth/react';
import dynamic from 'next/dynamic';

const DynamicToaster = dynamic(() => import('@/components/ui/toaster').then((mod) => mod.Toaster), {
    ssr: false,
});

const RootLayout = ({ children }: Readonly<{ children: React.ReactNode }>) => {
    return (
        <SessionProvider>
            <html lang="en" suppressHydrationWarning>
                <body className={cn(GeistSans.variable, GeistMono.variable)}>
                    <ThemeProvider
                        attribute="class"
                        defaultTheme="system"
                        enableSystem
                        disableTransitionOnChange
                    >
                        {children}
                    </ThemeProvider>
                    <DynamicToaster />
                </body>
            </html>
        </SessionProvider>
    );
};

export default RootLayout;

export const revalidate = 3600; // Revalidate every hour
