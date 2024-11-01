import { ThemeProvider } from '@/components/theme-provider';
import { Toaster } from '@/components/ui/toaster';
import '@/styles/globals.css';
import { cn } from '@/lib/utils';
import { TRPCReactProvider } from '@/trpc/react';
import { GeistMono } from 'geist/font/mono';
import { GeistSans } from 'geist/font/sans';
import { ViewTransitions } from 'next-view-transitions';

const RootLayout = ({ children }: Readonly<{ children: React.ReactNode }>) => {
    return (
        <ViewTransitions>
            <html lang="en" suppressHydrationWarning>
                <body className={cn(GeistSans.variable, GeistMono.variable)}>
                    <ThemeProvider
                        attribute="class"
                        defaultTheme="system"
                        disableTransitionOnChange
                        enableSystem
                    >
                        <TRPCReactProvider>{children}</TRPCReactProvider>
                    </ThemeProvider>
                    <Toaster />
                </body>
            </html>
        </ViewTransitions>
    );
};

export default RootLayout;

export const revalidate = 3600; // Revalidate every hour
