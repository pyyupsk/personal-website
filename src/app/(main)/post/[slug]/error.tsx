'use client';

import { Button } from '@/components/ui/button';
import { EmptyState } from '@/components/ui/empty-state';
import { Bug } from 'lucide-react';
import { useEffect } from 'react';

export default function Error({
    error,
    reset,
}: {
    error: { digest?: string } & Error;
    reset: () => void;
}) {
    useEffect(() => {
        console.error(error);
    }, [error]);

    return (
        <section className="space-y-1.5">
            <EmptyState
                description="We're sorry, but we couldn't load this post. Please try again."
                icon={Bug}
                title="Failed to Load Post"
            >
                <Button onClick={reset} variant="outline">
                    Try Again
                </Button>
            </EmptyState>
        </section>
    );
}
