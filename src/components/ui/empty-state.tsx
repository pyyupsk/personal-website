type Props = {
    title: string;
    description: string;
    icon?: React.FC<React.SVGProps<SVGSVGElement>>;
    children?: React.ReactNode;
};

export function EmptyState({ title, description, icon, children }: Props) {
    const Icon = icon || (() => null);

    return (
        <div className="border rounded-md p-12">
            <div className="flex flex-col gap-6 items-center justify-center">
                {icon && (
                    <div className="flex justify-center items-center border rounded-md p-3">
                        <Icon className="h-8 w-8 text-muted-foreground" />
                    </div>
                )}
                <div className="flex flex-col gap-3 text-center justify-center items-center">
                    <p className="text-base font-semibold text-foreground">{title}</p>
                    <p className="max-w-64">{description}</p>
                </div>
                {children}
            </div>
        </div>
    );
}
