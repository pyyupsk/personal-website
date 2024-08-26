import { cn } from "@/lib/utils";

type Props = {
    title: string;
    description: string;
    icon?: React.FC<React.SVGProps<SVGSVGElement>>;
    className?: string;
    children?: React.ReactNode;
};

export function EmptyState({ title, description, icon, className, children }: Props) {
    const Icon = icon || (() => null);

    return (
        <div
            className={cn(
                "border rounded-md p-12 flex flex-col gap-6 items-center justify-center",
                className,
            )}
        >
            {icon && (
                <div className="flex justify-center items-center border rounded-md p-3">
                    <Icon className="h-8 w-8 text-muted-foreground" />
                </div>
            )}
            <div className="flex flex-col gap-3 text-center justify-center items-center">
                <h4 className="text-base font-semibold text-foreground">{title}</h4>
                <p>{description}</p>
            </div>
            {children}
        </div>
    );
}
