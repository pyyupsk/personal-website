'use client';

import { Separator } from '@/components/ui/separator';
import { Skeleton } from '@/components/ui/skeleton';
import { processMarkdown } from '@/lib/markdown';
import { api } from '@/trpc/react';
import { format } from 'date-fns';
import { notFound } from 'next/navigation';
import { useEffect, useMemo, useState } from 'react';

export function PostContent({ slug }: { slug: string }) {
    const [res] = api.posts.blog.useSuspenseQuery({ id: slug });
    const [isLoading, setIsLoading] = useState(true);
    const [processedContent, setProcessedContent] = useState<{
        html: string;
        readingTime: number;
    }>({ html: '', readingTime: 0 });

    useEffect(() => {
        setIsLoading(true);
        if (res?.post_content) {
            processMarkdown(res.post_content.content)
                .then(setProcessedContent)
                .finally(() => setIsLoading(false));
        } else {
            setIsLoading(false);
        }
    }, [res?.post_content]);

    const formattedDate = useMemo(() => {
        if (!res?.post) return '';
        return format(new Date(res.post.publishDate), 'LLLL d, yyyy');
    }, [res?.post]);

    if (!isLoading && !res?.post) return notFound();

    const { post } = res || {};

    return (
        <>
            <section className="space-y-1.5">
                <div className="flex justify-between">
                    {isLoading ? (
                        <>
                            <Skeleton className="h-4 w-48" />
                            <Skeleton className="h-4 w-24" />
                        </>
                    ) : (
                        <>
                            <time className="text-sm text-muted-foreground">
                                Published on {formattedDate}
                            </time>
                            <span className="text-sm text-muted-foreground">
                                {processedContent.readingTime} min read
                            </span>
                        </>
                    )}
                </div>
                {isLoading ? (
                    <Skeleton className="h-6 w-4/5" />
                ) : (
                    <div className="prose max-w-none dark:prose-invert">
                        <h1>{post?.title}</h1>
                        {post?.description && <p>{post.description}</p>}
                    </div>
                )}
            </section>
            <Separator className="my-4" />
            {isLoading ? (
                <div>
                    <Skeleton className="mb-4 h-4 w-full" />
                    <Skeleton className="mb-4 h-4 w-3/4" />
                    <Skeleton className="mb-4 h-4 w-full" />
                    <Skeleton className="mb-4 h-4 w-3/4" />
                    <Skeleton className="mb-4 h-4 w-full" />
                    <Skeleton className="mb-4 h-4 w-3/4" />
                    <Skeleton className="mb-4 h-4 w-2/4" />
                </div>
            ) : (
                <article
                    className="prose max-w-none dark:prose-invert"
                    dangerouslySetInnerHTML={{ __html: processedContent.html }}
                />
            )}
        </>
    );
}
