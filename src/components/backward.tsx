import Link from "next/link";

export function Backward({ href, children }: { href: string; children: React.ReactNode }) {
    return (
        <Link
            href={href}
            className="text-sm font-medium text-muted-foreground underline-offset-4 hover:underline"
        >
            &larr; {children}
        </Link>
    );
}
