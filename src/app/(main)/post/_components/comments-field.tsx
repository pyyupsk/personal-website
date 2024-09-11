'use client';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { EmptyState } from '@/components/ui/empty-state';
import { Textarea } from '@/components/ui/textarea';
import { toast } from '@/components/ui/use-toast';
import { LoaderCircleIcon, SendIcon } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { type User } from 'next-auth';
import { signIn } from 'next-auth/react';
import { useState, useTransition } from 'react';

import { createComment } from '../_actions/comment';

export function CommentsField({ postId, user }: { postId: string; user: undefined | User }) {
    const router = useRouter();
    const [comment, setComment] = useState('');
    const [isPending, startTransition] = useTransition();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!comment.trim()) {
            toast({
                description: 'Please enter a comment before submitting.',
                title: 'Comment cannot be empty',
                variant: 'destructive',
            });
            return;
        }

        startTransition(async () => {
            try {
                if (!user || !user.id) {
                    toast({
                        description:
                            'You need to be logged in to post a comment. Please log in or sign up.',
                        title: 'Login Required',
                        variant: 'destructive',
                    });
                    return;
                }
                await createComment({ authorId: user.id, content: comment, postId });
                setComment('');
                router.refresh();
            } catch (error) {
                console.error(error);
                toast({
                    description:
                        'There was an issue submitting your comment. Please try again later.',
                    title: 'Submission Error',
                    variant: 'destructive',
                });
            }
        });
    };

    if (!user || !user.id) {
        return (
            <EmptyState
                description="You need to be logged in to leave a comment. Please sign in or create an account to share your thoughts."
                title="Sign In to Comment"
            >
                <Button onClick={() => signIn()} variant="outline">
                    Log In
                </Button>
            </EmptyState>
        );
    }

    return (
        <form className="mt-6" onSubmit={handleSubmit}>
            <div className="flex items-start gap-3">
                <Avatar className="size-8">
                    <AvatarImage alt={user.name ?? 'User Avatar'} src={user?.image || undefined} />
                    <AvatarFallback>{user.name?.charAt(0).toUpperCase()}</AvatarFallback>
                </Avatar>
                <div className="flex grow flex-col items-end gap-3">
                    <Textarea
                        className="w-full rounded-md border p-3"
                        onChange={(e) => setComment(e.target.value)}
                        placeholder="Write a comment..."
                        value={comment}
                    />
                    <Button disabled={!comment.trim() || isPending} size="sm" type="submit">
                        {isPending ? (
                            <LoaderCircleIcon className="mr-2 size-4 animate-spin" />
                        ) : (
                            <SendIcon className="mr-2 size-4" />
                        )}
                        Submit
                    </Button>
                </div>
            </div>
        </form>
    );
}
