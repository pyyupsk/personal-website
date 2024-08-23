"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { EmptyState } from "@/components/ui/empty-state";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/components/ui/use-toast";
import { LoaderCircleIcon, SendIcon } from "lucide-react";
import { signIn, useSession } from "next-auth/react";
import { useState } from "react";
import { createComment } from "../_actions/comment";

export function CommentField({ postId }: { postId: string }) {
    const { data } = useSession();
    const { user } = data || {};

    const [comment, setComment] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            if (!user || !user.id) {
                return toast({
                    title: "Login Required",
                    description:
                        "You need to be logged in to post a comment. Please log in or sign up.",
                    variant: "destructive",
                });
            }

            if (!comment.trim()) {
                return toast({
                    title: "Comment cannot be empty",
                    description: "Please enter a comment before submitting.",
                    variant: "destructive",
                });
            }

            await createComment({ postId, content: comment, authorId: user.id });
            setComment("");
        } catch (error) {
            console.error(error);
            return toast({
                title: "Submission Error",
                description: "There was an issue submitting your comment. Please try again later.",
                variant: "destructive",
            });
        } finally {
            setLoading(false);
        }
    };

    if (!user) {
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
        <form onSubmit={handleSubmit} className="mt-4 p-4 bg-background rounded-lg shadow-sm">
            <div className="flex items-start space-x-4">
                <Avatar className="w-8 h-8">
                    <AvatarImage src={user?.image || undefined} alt={user.name} />
                    <AvatarFallback>{user.name?.charAt(0).toUpperCase()}</AvatarFallback>
                </Avatar>
                <div className="flex-grow">
                    <Textarea
                        placeholder="Write a comment..."
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                        className="w-full p-3 border rounded-md"
                    />
                    <Button type="submit" className="mt-3" disabled={!comment.trim() || loading}>
                        {loading ? (
                            <LoaderCircleIcon className="mr-2 h-4 w-4 animate-spin" />
                        ) : (
                            <SendIcon className="mr-2 h-4 w-4" />
                        )}
                        Submit
                    </Button>
                </div>
            </div>
        </form>
    );
}
