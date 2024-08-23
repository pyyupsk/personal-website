import "@/styles/globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { cn } from "@/lib/utils";
import { ClerkProvider } from "@clerk/nextjs";
import { GeistMono } from "geist/font/mono";
import { GeistSans } from "geist/font/sans";

const RootLayout = ({ children }: Readonly<{ children: React.ReactNode }>) => {
    return (
        <ClerkProvider>
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
                </body>
            </html>
        </ClerkProvider>
    );
};

export default RootLayout;

export const revalidate = 3600; // Revalidate every hour
