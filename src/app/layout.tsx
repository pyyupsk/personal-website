import '@/styles/globals.css';
import { Layout } from '@/components/layout';
import { author } from '@/data/author';
import { fontSans, fontSerif, fontSerifJP } from '@/fonts';
import { commonMetaData } from '@/lib/meta';
import { cn } from '@/utils/cn';

const TITLE = author.name.jp;
const DESCRIPTION = `👋 Hello! I'm ${author.name.jp}, a passionate full-stack developer with a passionate about creating innovative solutions that have a positive impact on people's lives.`;

export async function generateMetadata() {
    const metaData = commonMetaData({
        title: {
            template: `${TITLE} - %s`,
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
