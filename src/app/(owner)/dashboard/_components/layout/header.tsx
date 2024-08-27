'use client';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Skeleton } from '@/components/ui/skeleton';
import { Menu } from 'lucide-react';
import Link from 'next/link';
import { useSession } from 'next-auth/react';

import { navigation } from '../../_constants/navigation';

export function Header() {
    const { data: session, status } = useSession();
    const loading = status === 'loading';

    return (
        <header className="fixed inset-x-0 top-0 z-40 flex h-14 items-center justify-between gap-4 border-b bg-muted/40 px-4 backdrop-blur md:ml-[220px] md:justify-end lg:ml-[280px] lg:h-[60px] lg:px-6">
            <Sheet>
                <SheetTrigger asChild>
                    <Button className="shrink-0 md:hidden" size="icon" variant="outline">
                        <Menu className="size-5" />
                        <span className="sr-only">Toggle navigation menu</span>
                    </Button>
                </SheetTrigger>
                <SheetContent className="flex flex-col" side="left">
                    <nav className="grid gap-2 font-medium">
                        <div className="border-b pb-4">
                            <Link
                                className="flex items-center gap-2 !text-lg font-semibold"
                                href="/dashboard"
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
                                className="flex items-center gap-4 rounded-xl py-2 pr-3 !text-lg text-muted-foreground hover:text-foreground"
                                href={item.href}
                                key={item.name}
                            >
                                <item.icon className="size-5" />
                                {item.name}
                            </Link>
                        ))}
                    </nav>
                </SheetContent>
            </Sheet>
            <Avatar className="size-8">
                <AvatarImage src={session?.user?.image || 'https://ui-avatars.com/api/?name=PY'} />
                <AvatarFallback>PY</AvatarFallback>
            </Avatar>
        </header>
    );
}
