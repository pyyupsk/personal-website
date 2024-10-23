import { Separator } from '@/components/ui/separator';
import { type Posts } from '@prisma/client';
import { format } from 'date-fns';

interface Props {
    html: string;
    post: {
        description: Posts['description'];
        id: Posts['id'];
        publishDate: Posts['publishDate'];
        title: Posts['title'];
    };
    readingTime: number;
}

export function PostContent({ html, post, readingTime }: Props) {
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
