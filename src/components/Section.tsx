import { FlowbiteLinkOutline } from './icons/FlowbiteLinkOutline';
import { Badge } from './ui/badge';

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
        items?: string[];
    }[];
};

export type SectionProps = ListSection | GridSection;

export function SectionComponent({ title, data, type }: SectionProps) {
    return (
        <section>
            <h3>{title}</h3>
            {type === 'list' ? (
                <ul>
                    {data.map((entry) => (
                        <li key={`${entry.title}-${entry.description}`}>
                            <h4 className="flex gap-2 items-center">
                                {entry.title}
                                {entry.url && (
                                    <a href={entry.url} target="_blank" rel="noreferrer">
                                        <FlowbiteLinkOutline />
                                    </a>
                                )}
                            </h4>
                            {entry.subtitle && <p>{entry.subtitle}</p>}
                            <p>{entry.description}</p>
                        </li>
                    ))}
                </ul>
            ) : type === 'grid' ? (
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                    {data.map((entry) => (
                        <div key={`${entry.title}-${entry.description}`} className="prose dark:prose-invert">
                            <h4 className="flex gap-2 items-center">
                                {entry.title}
                                {entry.url && (
                                    <a href={entry.url} target="_blank" rel="noreferrer">
                                        <FlowbiteLinkOutline />
                                    </a>
                                )}
                            </h4>
                            <p className="line-clamp-2">{entry.description}</p>
                            {entry.items && (
                                <div className="flex flex-wrap gap-1">
                                    {entry.items.map((item) => (
                                        <Badge key={item} size="sm">
                                            {item}
                                        </Badge>
                                    ))}
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            ) : null}
        </section>
    );
}
