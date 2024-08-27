import { cn } from '@/lib/utils';

type Props = {
    children?: React.ReactNode;
    className?: string;
    description: string;
    icon?: React.FC<React.SVGProps<SVGSVGElement>>;
    title: string;
};

export function EmptyState({ children, className, description, icon, title }: Props) {
    const Icon = icon || (() => null);

    return (
        <div
            className={cn(
                'flex flex-col items-center justify-center gap-6 rounded-md border p-12',
                className,
            )}
        >
            {icon && (
                <div className="flex items-center justify-center rounded-md border p-3">
                    <Icon className="size-8 text-muted-foreground" />
                </div>
            )}
            <div className="flex flex-col items-center justify-center gap-3 text-center">
                <h4 className="text-base font-semibold text-foreground">{title}</h4>
                <p>{description}</p>
            </div>
            {children}
        </div>
    );
}
