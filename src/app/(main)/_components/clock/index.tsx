'use client';

import { getBangkokTime } from '@/utils/date-time';
import { useCallback, useEffect, useState } from 'react';

import { AnalogClock } from './analog-clock';
import { LoadingState } from './loading-state';
import { TimeDisplay } from './time-display';

export function Clock() {
    const [time, setTime] = useState(getBangkokTime);
    const [mounted, setMounted] = useState(false);

    const updateTime = useCallback(() => {
        setTime(getBangkokTime());
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
            <AnalogClock
                hours={time.getHours()}
                minutes={time.getMinutes()}
                seconds={time.getSeconds()}
            />
        </div>
    );
}
