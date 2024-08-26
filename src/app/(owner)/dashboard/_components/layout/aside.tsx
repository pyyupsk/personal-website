"use client";

import { Skeleton } from "@/components/ui/skeleton";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { navigation } from "../../_constants/navigation";

export function Aside() {
    const { data: session, status } = useSession({ required: true });
    const loading = status === "loading";

    return (
        <aside className="hidden border-r bg-muted/40 md:block w-[220px] lg:w-[280px] fixed top-0 bottom-0 left-0 z-50">
            <div className="flex h-full max-h-screen flex-col gap-2">
                <div className="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
                    <Link
                        href="/dashboard"
                        className="flex items-center gap-2 font-semibold !text-base"
                    >
                        {loading ? (
                            <Skeleton className="h-6 w-24" />
                        ) : (
                            <>{session?.user?.name}&apos;s Dashboard</>
                        )}
                    </Link>
                </div>
                <div className="flex-1">
                    <nav className="grid items-start px-2 text-sm font-medium lg:px-4 gap-4">
                        {navigation.map((item) => (
                            <Link
                                key={item.name}
                                href={item.href}
                                className="flex items-center gap-3 rounded-lg px-3 py-2 !text-base text-muted-foreground transition-all hover:text-primary"
                            >
                                <item.icon className="h-4 w-4" />
                                {item.name}
                            </Link>
                        ))}
                    </nav>
                </div>
            </div>
        </aside>
    );
}
