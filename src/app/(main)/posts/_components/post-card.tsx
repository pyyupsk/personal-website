import type { PostOutput } from '@/server/api/routers/posts';
import type { Route } from 'next';

import { formatDateVerbose } from '@/utils/date-time';
import { Link } from 'next-view-transitions';

export function PostCard({ post }: { post: PostOutput }) {
    return (
        <Link className="group" href={`/post/${post.id}` as Route} prefetch>
            <h3 className="group-hover:underline">{post.title}</h3>
            <time className="text-sm text-muted-foreground" dateTime={post.publishDate}>
                {formatDateVerbose(post.publishDate)}
            </time>
            {post.description && <p className="mt-1.5 line-clamp-3 text-sm">{post.description}</p>}
        </Link>
    );
}
