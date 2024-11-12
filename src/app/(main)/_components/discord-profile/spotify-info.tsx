import type { LanyardResponse } from '@/hooks/useDiscordUser';

import { HoverCard, HoverCardTrigger } from '@/components/ui/hover-card';
import { MessageMarquee } from '@/components/ui/message-marquee';
import { Headphones } from 'lucide-react';
import dynamic from 'next/dynamic';
import Image from 'next/image';

const HoverCardContent = dynamic(() =>
    import('@/components/ui/hover-card').then((mod) => mod.HoverCardContent),
);

export function SpotifyInfo({ spotify }: { spotify: LanyardResponse['data']['spotify'] }) {
    return (
        <HoverCard closeDelay={0} openDelay={0}>
            <HoverCardTrigger
                className="flex items-center text-sm hover:underline"
                href={`https://open.spotify.com/track/${spotify.track_id}`}
                rel="noreferrer"
                target="_blank"
            >
                <Headphones className="mr-1.5 size-3" />
                <MessageMarquee message={`${spotify.song} by ${spotify.artist}`} />
            </HoverCardTrigger>
            <HoverCardContent className="flex min-w-72 items-center space-x-3">
                <Image
                    alt={spotify.album}
                    className="size-16 rounded-md"
                    height={64}
                    src={spotify.album_art_url}
                    width={64}
                />
                <div>
                    <p className="font-semibold">{spotify.song}</p>
                    <p className="text-sm">by {spotify.artist}</p>
                    <p className="text-sm">
                        from the <code>{spotify.album}</code> album
                    </p>
                </div>
            </HoverCardContent>
        </HoverCard>
    );
}
