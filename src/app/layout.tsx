import '@/styles/globals.css';
import { Layout } from '@/components/layout';
import { author, experienceYears } from '@/data';
import { fontSans, fontSerif, fontSerifJP } from '@/fonts';
import { commonMetaData } from '@/lib/meta';
import { cn } from '@/utils/cn';
import NextTopLoader from 'nextjs-toploader';

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
            <body className={cn(fontSans.variable, fontSerif.variable, fontSerifJP.variable)}>
                <NextTopLoader
                    color="#2e405c"
                    height={5}
                    showSpinner={false}
                    speed={1000}
                    easing="ease-in-out"
                    shadow="0 0 10px #2e405c,0 0 5px #2e405c"
                />
                <Layout>{children}</Layout>
            </body>
        </html>
    );
};

export default RootLayout;
