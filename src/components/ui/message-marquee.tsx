'use client';

import { cn } from '@/lib/utils';
import { useEffect, useRef, useState } from 'react';

interface MessageMarqueeProps {
    className?: string;
    message: string;
}

export function MessageMarquee({ className, message }: MessageMarqueeProps) {
    const containerRef = useRef<HTMLDivElement>(null);
    const textRef = useRef<HTMLDivElement>(null);
    const [shouldScroll, setShouldScroll] = useState(false);

    useEffect(() => {
        if (containerRef.current && textRef.current) {
            const containerWidth = containerRef.current.offsetWidth;
            const textWidth = textRef.current.offsetWidth;

            setShouldScroll(textWidth > containerWidth);
        }
    }, [message]);

    const scrollDuration = shouldScroll ? `${(textRef.current?.offsetWidth || 0) / 50}s` : '0s';

    return (
        <div className={cn('mx-auto w-full overflow-hidden', className)} ref={containerRef}>
            <div
                className={cn(
                    'inline-flex items-center whitespace-nowrap',
                    shouldScroll && 'animate-marquee',
                )}
                ref={textRef}
                style={{
                    animationDuration: scrollDuration,
                }}
            >
                <span className="px-1.5">{message}</span>
                {shouldScroll &&
                    Array.from({ length: 2 }).map((_, index) => (
                        <span className="px-1.5" key={index}>
                            {message}
                        </span>
                    ))}
            </div>
        </div>
    );
}
