import { cn } from '@/utils/cn';
import { cva, type VariantProps } from 'class-variance-authority';
import * as React from 'react';

const badgeVariants = cva(
    'inline-flex items-center rounded-lg border font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2',
    {
        variants: {
            variant: {
                default: 'border-transparent bg-foreground text-background',
                opacity: 'border-transparent bg-primary/25 text-foreground/80',
                secondary: 'border-transparent bg-secondary text-secondary-foreground',
                destructive: 'border-transparent bg-destructive text-destructive-foreground',
                outline: 'text-foreground',
            },
            size: {
                default: 'px-3 py-0.5 text-md',
                sm: 'px-2 py-0.5 text-xs',
                lg: 'px-4 py-0.5 text-lg',
            },
        },
        defaultVariants: {
            variant: 'default',
            size: 'default',
        },
    },
);

interface BadgeProps extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, size, ...props }: BadgeProps) {
    return <div className={cn(badgeVariants({ variant, size }), className)} {...props} />;
}

export { Badge };
