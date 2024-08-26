import { buttonVariants } from '@/components/ui/button';
import { ArrowLeftIcon } from 'lucide-react';
import Link from 'next/link';

export default function Custom404() {
    return (
        <div className="flex min-h-screen flex-col items-center justify-center">
            <h1 className="!text-6xl font-bold">404</h1>
            <p className="mt-3 !text-xl !text-foreground">Page Not Found</p>
            <p className="mt-3 !text-lg">The page you are looking for does not exist.</p>
            <Link href="/" className={buttonVariants({ variant: 'outline', className: 'mt-6' })}>
                <ArrowLeftIcon className="mr-2 size-4" />
                Go back home
            </Link>
        </div>
    );
}
