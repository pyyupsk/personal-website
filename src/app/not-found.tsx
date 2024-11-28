import { buttonVariants } from '@/components/ui/button';
import { generateMetadata } from '@/lib/metadata';
import { openGraph } from '@/lib/open-graph';
import { ArrowLeftIcon } from 'lucide-react';
import { Link } from 'next-view-transitions';

export const metadata = generateMetadata({
    description:
        "Sorry, the page you're looking for doesn't exist. You can go back to the homepage or explore other sections of the website.",
    image: openGraph({
        badge: '404',
        button: 'Go to Homepage',
        description:
            "Pongsakorn Thipayanate's website. The requested page doesn't exist. Return to the homepage or explore the other sections.",
        title: 'Page Not Found | P. Thipayanate',
    }),
    title: 'Page Not Found | Pongsakorn Thipayanate',
});

export default function Custom404() {
    return (
        <div className="flex min-h-screen flex-col items-center justify-center">
            <h1 className="text-6xl font-bold">404</h1>
            <p className="mt-3 text-xl">Page Not Found</p>
            <p className="mt-3 text-lg text-muted-foreground">
                The page you are looking for does not exist.
            </p>
            <Link className={buttonVariants({ className: 'mt-6', variant: 'outline' })} href="/">
                <ArrowLeftIcon className="mr-2 size-4" />
                Go back home
            </Link>
        </div>
    );
}
