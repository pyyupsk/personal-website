import { ThemeProvider } from '@/components/theme-provider';
import { cn } from '@/lib/utils';
import '@/styles/globals.css';
import { GeistMono } from 'geist/font/mono';
import { GeistSans } from 'geist/font/sans';
import dynamic from 'next/dynamic';
import { SessionProvider } from 'next-auth/react';
import { ViewTransitions } from 'next-view-transitions';

const DynamicToaster = dynamic(() => import('@/components/ui/toaster').then((mod) => mod.Toaster), {
    ssr: false,
});

const RootLayout = ({ children }: Readonly<{ children: React.ReactNode }>) => {
    return (
        <SessionProvider>
            <ViewTransitions>
                <html lang="en" suppressHydrationWarning>
                    <body className={cn(GeistSans.variable, GeistMono.variable)}>
                        <ThemeProvider
                            attribute="class"
                            defaultTheme="system"
                            disableTransitionOnChange
                            enableSystem
                        >
                            {children}
                        </ThemeProvider>
                        <DynamicToaster />
                    </body>
                </html>
            </ViewTransitions>
        </SessionProvider>
    );
};

export default RootLayout;

export const revalidate = 3600; // Revalidate every hour
