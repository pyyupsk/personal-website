export const getRelativeTime = (date: Date) => {
    const SECOND = 1000;
    const MINUTE = 60 * SECOND;
    const HOUR = 60 * MINUTE;
    const DAY = 24 * HOUR;
    const WEEK = 7 * DAY;
    const YEAR = 365 * DAY;
    const MONTH = YEAR / 12;

    const units = [
        {
            max: 30 * SECOND,
            divisor: 1,
            past: 'just now',
            future: 'just now',
        },
        {
            max: MINUTE,
            divisor: SECOND,
            past: '# seconds ago',
            future: 'in # seconds',
        },
        {
            max: HOUR,
            divisor: MINUTE,
            past: '# minutes ago',
            future: 'in # minutes',
        },
        {
            max: DAY,
            divisor: HOUR,
            past: '# hours ago',
            future: 'in # hours',
        },
        {
            max: WEEK,
            divisor: DAY,
            past: '# days ago',
            future: 'in # days',
        },
        {
            max: MONTH,
            divisor: WEEK,
            past: '# weeks ago',
            future: 'in # weeks',
        },
        {
            max: YEAR,
            divisor: MONTH,
            past: '# months ago',
            future: 'in # months',
        },
        {
            max: 100 * YEAR,
            divisor: YEAR,
            past: '# years ago',
            future: 'in # years',
        },
        {
            max: Infinity,
            divisor: 100 * YEAR,
            past: '# centuries ago',
            future: 'in # centuries',
        },
    ];

    const diff = Date.now() - (typeof date === 'object' ? date.getTime() : new Date(date).getTime());
    const diffAbs = Math.abs(diff);

    for (const unit of units) {
        if (diffAbs < unit.max) {
            const isFuture = diff < 0;
            const quantity = Math.round(Math.abs(diff) / unit.divisor);
            if (quantity === 1) {
                return isFuture ? unit.future : unit.past;
            }
            return isFuture
                ? unit.future.replace('#', quantity.toString())
                : unit.past.replace('#', quantity.toString());
        }
    }
};
