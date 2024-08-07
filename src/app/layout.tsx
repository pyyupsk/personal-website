import { fontMono, fontSans } from "@/fonts";
import { commonMetaData } from "@/lib/meta";
import { cn } from "@/lib/utils";
import "@/styles/globals.css";

export function generateMetadata() {
    const metaData = commonMetaData({
        title: "Pongsakorn Thipayanate | Full Stack Developer in Samut Sakhon, Thailand",
        description:
            "Explore the portfolio of Pongsakorn Thipayanate, a dedicated full-stack developer from Samut Sakhon, Thailand. Passionate about creating impactful solutions through technology. Connect with Pongsakorn for collaboration or hiring opportunities at pyyupsk@proton.me.",
    });

    return metaData;
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
    return (
        <html lang="en" className="dark" suppressHydrationWarning>
            <body
                className={cn(
                    "min-h-screen bg-background font-sans antialiased",
                    fontSans.variable,
                    fontMono.variable,
                )}
            >
                <main>{children}</main>
            </body>
        </html>
    );
}
