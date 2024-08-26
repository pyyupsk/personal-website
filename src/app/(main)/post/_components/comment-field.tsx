'use client';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { EmptyState } from '@/components/ui/empty-state';
import { Textarea } from '@/components/ui/textarea';
import { toast } from '@/components/ui/use-toast';
import { LoaderCircleIcon, SendIcon } from 'lucide-react';
import { type User } from 'next-auth';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { createComment } from '../_actions/comment';

export function CommentField({ postId, user }: { postId: string; user: User | undefined }) {
    const router = useRouter();

    const [comment, setComment] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            if (!user || !user.id) {
                return toast({
                    title: 'Login Required',
                    description:
                        'You need to be logged in to post a comment. Please log in or sign up.',
                    variant: 'destructive',
                });
            }

            if (!comment.trim()) {
                return toast({
                    title: 'Comment cannot be empty',
                    description: 'Please enter a comment before submitting.',
                    variant: 'destructive',
                });
            }

            await createComment({ postId, content: comment, authorId: user.id });
            setComment('');
            router.refresh();
        } catch (error) {
            console.error(error);
            return toast({
                title: 'Submission Error',
                description: 'There was an issue submitting your comment. Please try again later.',
                variant: 'destructive',
            });
        } finally {
            setLoading(false);
        }
    };

    if (!user || !user.id) {
        return (
            <EmptyState
                title="Sign In to Comment"
                description="You need to be logged in to leave a comment. Please sign in or create an account to share your thoughts."
            >
                <Button variant="outline" onClick={() => signIn()}>
                    Log In
                </Button>
            </EmptyState>
        );
    }

    return (
        <form onSubmit={handleSubmit} className="mt-6">
            <div className="flex items-start gap-3">
                <Avatar className="size-8">
                    <AvatarImage src={user?.image || undefined} alt={user.name ?? 'User Avatar'} />
                    <AvatarFallback>{user.name?.charAt(0).toUpperCase()}</AvatarFallback>
                </Avatar>
                <div className="flex grow flex-col items-end gap-3">
                    <Textarea
                        placeholder="Write a comment..."
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                        className="w-full rounded-md border p-3"
                    />
                    <Button type="submit" size="sm" disabled={!comment.trim() || loading}>
                        {loading ? (
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
