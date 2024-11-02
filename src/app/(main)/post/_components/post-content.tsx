'use client';

import { Separator } from '@/components/ui/separator';
import { processMarkdown } from '@/lib/markdown';
import { api } from '@/trpc/react';
import { format } from 'date-fns';
import { notFound } from 'next/navigation';
import { useEffect, useMemo, useState } from 'react';

export function PostContent({ slug }: { slug: string }) {
    const { data: res } = api.posts.blog.useQuery({ id: slug });
    const [processedContent, setProcessedContent] = useState({ html: '', readingTime: 0 });

    useEffect(() => {
        if (res?.post_content) {
            processMarkdown(res.post_content.content).then(setProcessedContent);
        }
    }, [res?.post_content]);

    const formattedDate = useMemo(() => {
        if (!res?.post) return '';
        return format(new Date(res.post.publishDate), 'LLLL d, yyyy');
    }, [res?.post]);

    if (!res?.post) return notFound();

    const { post } = res;

    return (
        <>
            <section className="space-y-1.5">
                <div className="flex justify-between">
                    <time className="text-sm text-muted-foreground">
                        Published on {formattedDate}
                    </time>
                    <span className="text-sm text-muted-foreground">
                        {processedContent.readingTime} min read
                    </span>
                </div>
                <div className="prose max-w-none dark:prose-invert">
                    <h1>{post.title}</h1>
                    {post.description && <p>{post.description}</p>}
                </div>
            </section>
            <Separator />
            <article
                className="prose max-w-none dark:prose-invert"
                dangerouslySetInnerHTML={{ __html: processedContent.html }}
            />
        </>
    );
}
