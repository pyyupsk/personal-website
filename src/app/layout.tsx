import '@/styles/globals.css';
import { Layout } from '@/components/layout';
import { author, experienceYears } from '@/data';
import { fontSans, fontSerif, fontSerifJP } from '@/fonts';
import { commonMetaData } from '@/lib/meta';
import { cn } from '@/utils/cn';

const TITLE = `${author.name.en} (${author.name.jp})`;
const DESCRIPTION = `Meet ${author.name.en} (${author.name.jp}), a seasoned full-stack developer with over ${experienceYears} years of expertise. Passionate about crafting innovative solutions that enrich lives. Currently driving projects at Juniper Nexus and exploring new challenges. Discover more about my work in web development, backend services, and UI/UX design.`;

export async function generateMetadata() {
    const metaData = commonMetaData({
        title: {
            template: `%s | ${TITLE}`,
            default: TITLE,
        },
        description: DESCRIPTION,
    });

    return metaData;
}

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
                <Layout>{children}</Layout>
            </body>
        </html>
    );
};

export default RootLayout;
