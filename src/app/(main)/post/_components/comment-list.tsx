import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { prisma } from "@/lib/prisma";
import { formatDistanceToNow } from "date-fns";

export async function CommentList({ postId }: { postId: string }) {
    const comments = await prisma.comment.findMany({
        where: { postId },
        select: {
            id: true,
            content: true,
            author: { select: { name: true, image: true } },
            commentDate: true,
        },
    });

    return (
        <div className="space-y-1.5">
            {comments.map((comment) => (
                <div key={comment.id} className="flex gap-3 bg-background border-b py-3 shadow-sm">
                    <Avatar className="w-8 h-8">
                        <AvatarImage
                            src={comment.author.image || undefined}
                            alt={comment.author.name || "User Avatar"}
                        />
                        <AvatarFallback>
                            {comment.author.name?.charAt(0).toUpperCase()}
                        </AvatarFallback>
                    </Avatar>
                    <div>
                        <div>
                            <span>{comment.author.name}</span>
                            <time className="ml-2 text-sm text-muted-foreground">
                                {formatDistanceToNow(comment.commentDate, { addSuffix: true })}
                            </time>
                        </div>
                        <p className="mt-1 text-foreground">{comment.content}</p>
                    </div>
                </div>
            ))}
        </div>
    );
}
