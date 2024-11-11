export function TimeDisplay({ time }: { time: Date }) {
    // Ensure that the 'time' is a valid Date object
    if (!(time instanceof Date) || isNaN(time.getTime())) {
        // Return early if 'time' is invalid
        return <p className="text-sm text-red-500">Invalid time</p>;
    }

    // Format time
    const options: Intl.DateTimeFormatOptions = {
        hour: '2-digit',
        hour12: false,
        minute: '2-digit',
        second: '2-digit',
    };
    const timeFormatted = new Intl.DateTimeFormat('en-GB', options).format(time);

    // Format date
    const dateOptions: Intl.DateTimeFormatOptions = {
        day: 'numeric',
        month: 'numeric',
        weekday: 'short',
        year: 'numeric',
    };
    const dateFormatted = new Intl.DateTimeFormat('en-GB', dateOptions).format(time);

    return (
        <div className="flex flex-col justify-center">
            <p className="text-sm">{timeFormatted} (+7)</p>
            <p className="text-sm">{dateFormatted}</p>
        </div>
    );
}
