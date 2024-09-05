'use client';

import { HoverCard, HoverCardContent, HoverCardTrigger } from '@/components/ui/hover-card';
import moment from 'moment-timezone';
import { useCallback, useEffect, useState } from 'react';

import { AnalogClock } from './analog-clock';
import { LoadingState } from './loading-state';
import { TimeDisplay } from './time-display';

const TIMEZONE = 'Asia/Bangkok';

export function Clock() {
    const [time, setTime] = useState(() => moment().tz(TIMEZONE));
    const [mounted, setMounted] = useState(false);

    const updateTime = useCallback(() => {
        setTime(moment().tz(TIMEZONE));
    }, []);

    useEffect(() => {
        const timer = setInterval(updateTime, 1000);
        setMounted(true);
        return () => clearInterval(timer);
    }, [updateTime]);

    if (!mounted) return <LoadingState />;

    return (
        <div className="flex items-center gap-1.5 whitespace-nowrap">
            <TimeDisplay time={time} />
            <HoverCard closeDelay={0} openDelay={0}>
                <HoverCardTrigger>
                    <AnalogClock
                        hours={time.hours()}
                        minutes={time.minutes()}
                        seconds={time.seconds()}
                    />
                </HoverCardTrigger>
                <HoverCardContent>
                    <AnalogClock
                        className="size-48"
                        hours={time.hours()}
                        minutes={time.minutes()}
                        seconds={time.seconds()}
                    />
                </HoverCardContent>
            </HoverCard>
        </div>
    );
}
