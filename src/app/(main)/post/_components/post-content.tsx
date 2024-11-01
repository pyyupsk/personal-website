'use client';

import { Separator } from '@/components/ui/separator';
import { processMarkdown } from '@/lib/markdown';
import { api } from '@/trpc/react';
import { format } from 'date-fns';
import { notFound } from 'next/navigation';
import { useEffect, useState } from 'react';

export function PostContent({ slug }: { slug: string }) {
    const [html, setHtml] = useState('');
    const [readingTime, setReadingTime] = useState(0);
    const [results] = api.posts.blog.useSuspenseQuery({ id: slug });
    const { post, post_content } = results || {};

    if (!post) {
        notFound();
    }

    useEffect(() => {
        const process = async () => {
            const { html, readingTime } = await processMarkdown(post_content!.content);

            setHtml(html);
            setReadingTime(readingTime);
        };

        process();
    }, [post_content]);

    return (
        <>
            <section className="space-y-1.5">
                <div className="flex justify-between">
                    <time className="text-sm text-muted-foreground">
                        Published on {format(post.publishDate, 'LLLL d, yyyy')}
                    </time>
                    <span className="text-sm text-muted-foreground">{readingTime} min read</span>
                </div>
                <div className="prose max-w-none dark:prose-invert">
                    <h1>{post.title}</h1>
                    {post.description && <p>{post.description}</p>}
                </div>
            </section>
            <Separator />
            <article
                className="prose max-w-none dark:prose-invert"
                dangerouslySetInnerHTML={{ __html: html }}
            />
        </>
    );
}
