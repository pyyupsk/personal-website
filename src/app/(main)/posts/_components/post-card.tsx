import { type Posts } from '@prisma/client';
import { format } from 'date-fns';
import { Link } from 'next-view-transitions';

export function PostCard({ post }: { post: Omit<Posts, 'content' | 'status'> }) {
    return (
        <Link className="group" href={`/post/${post.id}`} rel="preload">
            <h3 className="group-hover:underline">{post.title}</h3>
            <time className="text-sm text-muted-foreground">
                {format(post.publishDate, 'LLLL d, yyyy')}
            </time>
            {post.description && <p className="mt-1.5 text-sm">{post.description}</p>}
        </Link>
    );
}
