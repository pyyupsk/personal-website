"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Skeleton } from "@/components/ui/skeleton";
import { Menu } from "lucide-react";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { navigation } from "../../_constants/navigation";

export function Header() {
    const { data: session, status } = useSession();
    const loading = status === "loading";

    return (
        <header className=" fixed top-0 z-40 md:ml-[220px] lg:ml-[280px] inset-x-0 flex h-14 items-center justify-between md:justify-end gap-4 border-b bg-muted/40 backdrop-blur px-4 lg:h-[60px] lg:px-6">
            <Sheet>
                <SheetTrigger asChild>
                    <Button variant="outline" size="icon" className="shrink-0 md:hidden">
                        <Menu className="h-5 w-5" />
                        <span className="sr-only">Toggle navigation menu</span>
                    </Button>
                </SheetTrigger>
                <SheetContent side="left" className="flex flex-col">
                    <nav className="grid gap-2 font-medium">
                        <div className="pb-4 border-b">
                            <Link
                                href="/dashboard"
                                className="flex items-center gap-2 font-semibold !text-lg"
                            >
                                {loading ? (
                                    <Skeleton className="h-6 w-24" />
                                ) : (
                                    <>{session?.user?.name}&apos;s Dashboard</>
                                )}
                            </Link>
                        </div>
                        {navigation.map((item) => (
                            <Link
                                key={item.name}
                                href={item.href}
                                className="flex items-center gap-4 rounded-xl pr-3 py-2 !text-lg text-muted-foreground hover:text-foreground"
                            >
                                <item.icon className="h-5 w-5" />
                                {item.name}
                            </Link>
                        ))}
                    </nav>
                </SheetContent>
            </Sheet>
            <Avatar className="h-8 w-8">
                <AvatarImage src={session?.user?.image || "https://ui-avatars.com/api/?name=PY"} />
                <AvatarFallback>PY</AvatarFallback>
            </Avatar>
        </header>
    );
}
