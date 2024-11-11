'use client';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { env } from '@/env';
import { useDiscordUser } from '@/hooks/useDiscordUser';
import { cn } from '@/lib/utils';
import dynamic from 'next/dynamic';

import { ErrorState } from './error-state';
import { LoadingState } from './loading-state';
import { getStatusColor } from './utils';

const SpotifyInfo = dynamic(() => import('./spotify-info').then((mod) => mod.SpotifyInfo));

export function DiscordProfile() {
    const { data, error, isLoading } = useDiscordUser(env.NEXT_PUBLIC_DISCORD_USER_ID);

    if (error) return <ErrorState />;
    if (isLoading || !data) return <LoadingState />;

    const { discord_status: status, discord_user: user, spotify } = data.data;

    return (
        <div className="flex w-1/2 items-center gap-1.5">
            <Avatar className={cn('border-2', getStatusColor(status || 'offline'))}>
                <AvatarImage
                    alt={user.username}
                    height={40}
                    src={`https://cdn.discordapp.com/avatars/${user.id}/${user.avatar}.webp?size=40`}
                    width={40}
                />
                <AvatarFallback>{user.username.slice(0, 2).toUpperCase()}</AvatarFallback>
            </Avatar>
            <div className="flex w-full flex-col overflow-hidden">
                <a
                    className="flex flex-col whitespace-nowrap font-semibold hover:underline sm:flex-row sm:items-center sm:gap-1.5"
                    href={`https://discord.com/users/${user.id}`}
                    rel="noreferrer"
                    target="_blank"
                >
                    <span className="text-foreground">{user.global_name || user.username}</span>
                    {user.global_name && (
                        <span className="hidden text-sm font-normal sm:inline">
                            (@
                            {user.username})
                        </span>
                    )}
                </a>
                {spotify && <SpotifyInfo spotify={spotify} />}
            </div>
        </div>
    );
}
