import { buttonVariants } from "@/components/ui/button";
import { ArrowLeftIcon } from "lucide-react";
import Link from "next/link";

export default function Custom404() {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen">
            <h1 className="!text-6xl font-bold">404</h1>
            <p className="mt-3 !text-xl !text-foreground">Page Not Found</p>
            <p className="mt-3 !text-lg">The page you are looking for does not exist.</p>
            <Link href="/" className={buttonVariants({ variant: "outline", className: "mt-6" })}>
                <ArrowLeftIcon className="h-4 w-4 mr-2" />
                Go back home
            </Link>
        </div>
    );
}
