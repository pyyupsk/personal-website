import { cn } from '@/lib/utils';

interface Props {
    className?: string;
    hours: number;
    minutes: number;
    seconds: number;
}

export function AnalogClock({ className, hours, minutes, seconds }: Props) {
    return (
        <div className={cn('relative size-12', className)}>
            <svg className="size-full" viewBox="0 0 100 100">
                {/* Clock face */}
                <circle
                    className="text-foreground"
                    cx="50"
                    cy="50"
                    fill="none"
                    r="48"
                    stroke="currentColor"
                    strokeWidth="2"
                />

                {/* Hour markers */}
                {Array.from({ length: 12 }).map((_, index) => {
                    const angle = (index * 30 - 90) * (Math.PI / 180);
                    const x = 50 + 40 * Math.cos(angle);
                    const y = 50 + 40 * Math.sin(angle);
                    return (
                        <text
                            className="text-foreground"
                            dominantBaseline="middle"
                            fill="currentColor"
                            fontSize="8"
                            key={index}
                            textAnchor="middle"
                            x={x}
                            y={y}
                        >
                            {index + 1}
                        </text>
                    );
                })}

                {/* Hour hand */}
                <line
                    className="text-muted-foreground"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeWidth="4"
                    transform={`rotate(${hours * 30 + minutes * 0.5}, 50, 50)`}
                    x1="50"
                    x2="50"
                    y1="50"
                    y2="24"
                />

                {/* Minute hand */}
                <line
                    className="text-foreground"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeWidth="2"
                    transform={`rotate(${minutes * 6}, 50, 50)`}
                    x1="50"
                    x2="50"
                    y1="50"
                    y2="16"
                />

                {/* Second hand */}
                <line
                    className="text-red-500"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeWidth="1"
                    transform={`rotate(${seconds * 6}, 50, 50)`}
                    x1="50"
                    x2="50"
                    y1="50"
                    y2="14"
                />

                {/* Center dot */}
                <circle cx="50" cy="50" fill="currentColor" r="2" />
            </svg>
        </div>
    );
}
