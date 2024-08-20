import "@/styles/globals.css";
import { cn } from "@/lib/utils";
import { fontBody, fontHeading, fontMono } from "@/styles/fonts";
import { ClerkProvider } from "@clerk/nextjs";
import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Axiom Skeleton",
    description: "Next.js TypeScript Tailwind CSS Template",
};

const RootLayout = ({ children }: Readonly<{ children: React.ReactNode }>) => {
    return (
        <ClerkProvider>
            <html lang="en" suppressHydrationWarning>
                <body className={cn(fontBody.variable, fontHeading.variable, fontMono.variable)}>
                    {children}
                </body>
            </html>
        </ClerkProvider>
    );
};

export default RootLayout;
