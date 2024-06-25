'use client';

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogOverlay,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog';
import { music } from '@/data/music';
import { getRelativeTime } from '@/utils/date';
import Image from 'next/image';
import { useEffect, useState } from 'react';

type Response = {
    items: Item[];
};

type Item = {
    snippet: Snippet;
};

type Snippet = {
    publishedAt: Date;
    channelId: string;
    title: string;
    description: string;
    thumbnails: Thumbnails;
    channelTitle: string;
    tags: string[];
    categoryId: string;
    url: string;
};

type Thumbnails = {
    default: Default;
    medium: Default;
    high: Default;
    standard: Default;
    maxres: Default;
};

type Default = {
    url: string;
    width: number;
    height: number;
};

export function MusicalComponent() {
    const [musicals, setMusicals] = useState<Snippet[]>([]);

    useEffect(() => {
        const fetchSnippets = async () => {
            try {
                const fetchedSnippets = await Promise.all(
                    music.map(async (item) => {
                        const videoId = extractVideoId(item.url);
                        const response = await fetch(
                            `https://www.googleapis.com/youtube/v3/videos?part=snippet&id=${videoId}&type=video&key=AIzaSyC5XYHdF6wfY_1V9F-upB_T55vciPOu8ro`,
                        );

                        if (!response.ok) {
                            throw new Error('Failed to fetch snippets');
                        }

                        const data: Response = await response.json();
                        return { ...data.items[0].snippet, url: item.url };
                    }),
                );

                setMusicals(fetchedSnippets);
            } catch (error) {
                console.error('Error fetching snippets:', error);
            }
        };

        fetchSnippets();
    }, []);

    const extractVideoId = (url: string) => {
        const regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/;
        const match = url.match(regExp);
        return match && match[7].length === 11 ? match[7] : '';
    };

    return (
        <ul className="flex flex-col gap-[1.875rem] pl-6">
            {musicals.map((musical) => (
                <Dialog key={musical.title}>
                    <DialogOverlay className="fixed inset-0 bg-background/50 backdrop-blur-sm" />
                    <DialogTrigger>
                        <li key={musical.title} className="flex flex-col md:flex-row gap-6 text-start">
                            <div className="relative md:min-w-[300px] w-full">
                                <Image
                                    src={musical.thumbnails.high.url}
                                    alt={musical.title}
                                    width={500}
                                    height={500}
                                    className="aspect-video rounded-md object-cover"
                                />
                            </div>
                            <div className="flex flex-col gap-2">
                                <h3 className="text-xl font-semibold">{musical.title}</h3>
                                <time>{getRelativeTime(new Date(musical.publishedAt))}</time>

                                <div style={{ WebkitMaskImage: 'linear-gradient(0deg, transparent 0%, black 100%)' }}>
                                    <p className="line-clamp-4 text-start">{musical.description}</p>
                                </div>
                            </div>
                        </li>
                    </DialogTrigger>
                    <DialogContent className="pr-0 rounded-lg">
                        <DialogHeader>
                            <DialogTitle className="text-start">{musical.title}</DialogTitle>
                        </DialogHeader>
                        <DialogDescription className="max-h-[50vh] overflow-auto pr-4 gap-4 flex flex-col">
                            <iframe
                                className="aspect-video w-full rounded-md"
                                src={`https://www.youtube.com/embed/${extractVideoId(musical.url)}`}
                                title={musical.title}
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                allowFullScreen
                            />
                            <div className="border-b border-foreground border-dashed"></div>
                            <pre>{musical.description}</pre>
                        </DialogDescription>
                    </DialogContent>
                </Dialog>
            ))}
        </ul>
    );
}
