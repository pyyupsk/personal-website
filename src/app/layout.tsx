import "@/styles/globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "@/components/ui/toaster";
import { cn } from "@/lib/utils";
import { GeistMono } from "geist/font/mono";
import { GeistSans } from "geist/font/sans";
import { SessionProvider } from "next-auth/react";

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
                    <Toaster />
                </body>
            </html>
        </SessionProvider>
    );
};

export default RootLayout;

export const revalidate = 3600; // Revalidate every hour
