import Link from 'next/link';

type ListSection = {
    title: string | number;
    type: 'list';
    data: {
        title: string | number;
        subtitle?: string;
        url?: string;
        description: string;
    }[];
};

type GridSection = {
    title: string | number;
    type: 'grid';
    data: {
        title: string | number;
        description: string;
        url?: string;
    }[];
};

export type SectionProps = ListSection | GridSection;

export function SectionComponent({ title, data, type }: SectionProps) {
    return (
        <section>
            <h2>{title}</h2>
            {type === 'list' ? (
                <ul>
                    {data.map((entry) => (
                        <li key={`${entry.title}-${entry.description}`}>
                            <h3 className="flex gap-2 items-center">{entry.title}</h3>
                            {entry.subtitle && <p>{entry.subtitle}</p>}
                            <p>{entry.description}</p>
                        </li>
                    ))}
                </ul>
            ) : type === 'grid' ? (
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                    {data.map((entry) => (
                        <div key={`${entry.title}-${entry.description}`}>
                            <h3 className="flex gap-2 items-center">
                                {entry.url ? (
                                    <Link href={entry.url} target="_blank" rel="noreferrer" className="no-hover">
                                        {entry.title}
                                    </Link>
                                ) : (
                                    entry.title
                                )}
                            </h3>
                            <p className="line-clamp-2">{entry.description}</p>
                        </div>
                    ))}
                </div>
            ) : null}
        </section>
    );
}
