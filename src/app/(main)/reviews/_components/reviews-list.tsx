import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { buttonVariants } from '@/components/ui/button';
import { EmptyState } from '@/components/ui/empty-state';
import { cn } from '@/lib/utils';
import { format } from 'date-fns';
import { Star } from 'lucide-react';

import { getReviews } from '../_actions/reviews';

export async function ReviewsList() {
    const { data: comments, error } = await getReviews();

    if (error) {
        return (
            <EmptyState
                description="We couldn't find any reviews. Please try again later."
                icon={Star}
                title="No Reviews Found"
            >
                <a
                    className={buttonVariants({ variant: 'outline' })}
                    href="https://fastwork.co/user/firstpsk"
                    rel="noreferrer"
                    target="_blank"
                >
                    See on Fastwork
                </a>
            </EmptyState>
        );
    }

    return (
        <section className="flex flex-col gap-3">
            {comments.map((comment) => (
                <div
                    className="group flex flex-col gap-3 rounded-md border p-3 shadow-md"
                    key={comment.id}
                >
                    <div className="flex items-center gap-3">
                        <Avatar className="size-10">
                            <AvatarImage
                                alt={comment.reviewer.display_name}
                                src={comment.reviewer.image}
                            />
                            <AvatarFallback>
                                {comment.reviewer.display_name.charAt(0)}
                            </AvatarFallback>
                        </Avatar>
                        <div className="flex flex-col">
                            <p className="text-foreground group-hover:underline">
                                {comment.is_anonymous ? 'anonymous' : comment.reviewer.display_name}
                            </p>
                            <time
                                className="text-sm text-muted-foreground"
                                dateTime={comment.created_at}
                            >
                                {format(comment.created_at, 'LLLL d, yyyy')}
                            </time>
                        </div>
                        <div className="ml-auto flex gap-0 transition-all group-hover:gap-px">
                            {[...Array(5)].map((_, i) => (
                                <Star
                                    className={cn(
                                        'size-4 transition-all group-hover:scale-105',
                                        i < comment.rating
                                            ? 'fill-yellow-400 text-yellow-400'
                                            : 'text-gray-400',
                                    )}
                                    key={i}
                                />
                            ))}
                        </div>
                    </div>
                    {comment.description && (
                        <p className="text-sm text-muted-foreground transition-all group-hover:text-foreground">
                            {comment.description}
                        </p>
                    )}
                </div>
            ))}
        </section>
    );
}
