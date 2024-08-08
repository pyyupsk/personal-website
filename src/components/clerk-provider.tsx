import { ClerkProvider as BaseClerkProvider } from "@clerk/nextjs";
import { ReactNode } from "react";
import { buttonVariants } from "./ui/button";

export function ClerkProvider({ children }: { children: ReactNode }) {
    return (
        <BaseClerkProvider
            appearance={{
                elements: {
                    cardBox: "w-full min-w-3xl",
                    card: "bg-card p-10 border border-border",
                    headerTitle:
                        "scroll-m-20 font-medium text-lg tracking-tight text-card-foreground",
                    headerSubtitle: "leading-7 text-sm text-muted-foreground",
                    socialButtonsIconButton: buttonVariants({ variant: "secondary" }),
                    providerIcon__github: "invert",
                    dividerLine: "bg-border",
                    dividerText: "text-muted-foreground",
                    formFieldLabel: "text-card-foreground",
                    formFieldInput:
                        "flex h-9 w-full rounded-md bg-input text-card-foreground px-3 py-1 text-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring",
                    formButtonPrimary: buttonVariants({ variant: "secondary" }),
                    footer: "hidden",
                },
            }}
        >
            {children}
        </BaseClerkProvider>
    );
}
