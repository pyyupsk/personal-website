import type { Moment } from 'moment-timezone';

export function TimeDisplay({ time }: { time: Moment }) {
    return (
        <div className="flex flex-col justify-center">
            <p className="text-sm">{time.format('HH:mm:ss')} (+7)</p>
            <p className="text-sm">{time.format('ddd, D/M/YYYY')}</p>
        </div>
    );
}
