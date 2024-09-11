'use client';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { env } from '@/env';
import { cn } from '@/lib/utils';
import { Link } from 'next-view-transitions';
import useSWR from 'swr';

import type { Response } from './types';

import { ErrorState } from './error-state';
import { LoadingState } from './loading-state';
import { SpotifyInfo } from './spotify-info';
import { getStatusColor } from './utils';

const fetcher = (url: string) => fetch(url).then((res) => res.json());

const DISCORD_API_URL = `https://api.lanyard.rest/v1/users/${env.NEXT_PUBLIC_DISCORD_USER_ID}`;

export function DiscordProfile() {
    const { data, error, isLoading } = useSWR<Response>(DISCORD_API_URL, fetcher);

    if (error) return <ErrorState />;
    if (isLoading || !data) return <LoadingState />;

    const { discord_status: status, discord_user: user, spotify } = data.data;

    return (
        <div className="flex w-1/2 items-center gap-1.5">
            <Avatar className={cn('border-2', getStatusColor(status || 'offline'))}>
                <AvatarImage alt={user.username} src={`https://api.lanyard.rest/${user.id}.webp`} />
                <AvatarFallback>{user.username.slice(0, 2).toUpperCase()}</AvatarFallback>
            </Avatar>
            <div className="flex w-full flex-col overflow-hidden">
                <Link
                    className="flex flex-col whitespace-nowrap font-semibold hover:underline sm:flex-row sm:items-center sm:gap-1.5"
                    href={`https://discord.com/users/${user.id}`}
                    target="_blank"
                >
                    <span className="text-foreground">{user.global_name || user.username}</span>
                    {user.global_name && (
                        <span className="hidden text-sm font-normal sm:inline">
                            (@
                            {user.username})
                        </span>
                    )}
                </Link>
                {spotify && <SpotifyInfo spotify={spotify} />}
            </div>
        </div>
    );
}
