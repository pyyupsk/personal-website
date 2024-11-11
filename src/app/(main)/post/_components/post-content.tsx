'use client';

import { Separator } from '@/components/ui/separator';
import { formatDateVerbose } from '@/utils/date-time';
import { memo } from 'react';

type Props = {
    html: string;
    post: {
        description: null | string;
        id: string;
        publishDate: string;
        status: 'ARCHIVED' | 'DRAFT' | 'PUBLISHED';
        title: string;
    };
    readingTime: number;
};

export const PostContent = memo(function PostContent({ html, post, readingTime }: Props) {
    return (
        <>
            <section className="space-y-1.5">
                <div className="flex justify-between">
                    <time className="text-sm text-muted-foreground" dateTime={post.publishDate}>
                        Published on {formatDateVerbose(post.publishDate)}
                    </time>
                    <span className="text-sm text-muted-foreground">{readingTime} min read</span>
                </div>
                <div className="prose max-w-none dark:prose-invert">
                    <h1>{post.title}</h1>
                    {post.description && <p>{post.description}</p>}
                </div>
            </section>
            <Separator className="my-4" />
            <article
                className="prose max-w-none dark:prose-invert"
                dangerouslySetInnerHTML={{ __html: html }}
            />
        </>
    );
});
