import type { Route } from 'next';

import { format } from 'date-fns';
import { Link } from 'next-view-transitions';

import type { PostData } from '../_types/PostData';

export function PostCard({ post }: { post: PostData }) {
    return (
        <Link className="group" href={`/post/${post.id}` as Route} prefetch>
            <h3 className="group-hover:underline">{post.title}</h3>
            <time className="text-sm text-muted-foreground" dateTime={post.publishDate}>
                {format(new Date(post.publishDate), 'LLLL d, yyyy')}
            </time>
            {post.description && <p className="mt-1.5 line-clamp-3 text-sm">{post.description}</p>}
        </Link>
    );
}
