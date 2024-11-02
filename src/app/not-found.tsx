import type { Metadata } from 'next/dist/lib/metadata/types/metadata-interface';

import { buttonVariants } from '@/components/ui/button';
import { commonMetaData } from '@/lib/meta';
import { openGraph } from '@/lib/open-graph';
import { ArrowLeftIcon } from 'lucide-react';
import { Link } from 'next-view-transitions';

export const metadata: Metadata = commonMetaData({
    description:
        'Sorry, the page you’re looking for doesn’t exist. Return to the homepage or explore my latest posts and projects for more insights and updates.',
    image: openGraph({
        button: 'Go Home',
        description:
            'Oops! The page you’re looking for doesn’t exist. Return to the homepage to find what you need.',
        title: '404 - Page Not Found',
    }),
    title: 'Page Not Found - Pongsakorn Thipayanate',
});

export default function Custom404() {
    return (
        <div className="flex min-h-screen flex-col items-center justify-center">
            <h1 className="!text-6xl font-bold">404</h1>
            <p className="mt-3 !text-xl !text-foreground">Page Not Found</p>
            <p className="mt-3 !text-lg">The page you are looking for does not exist.</p>
            <Link className={buttonVariants({ className: 'mt-6', variant: 'outline' })} href="/">
                <ArrowLeftIcon className="mr-2 size-4" />
                Go back home
            </Link>
        </div>
    );
}
