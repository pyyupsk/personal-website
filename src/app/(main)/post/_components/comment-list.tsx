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
                <div
                    key={comment.id}
                    className="flex space-x-4 p-4 bg-background rounded-lg shadow-sm"
                >
                    <Avatar className="w-10 h-10">
                        <AvatarImage
                            src={comment.author.image || undefined}
                            alt={comment.author.name}
                        />
                        <AvatarFallback>
                            {comment.author.name?.charAt(0).toUpperCase()}
                        </AvatarFallback>
                    </Avatar>
                    <div className="flex-grow">
                        <div className="flex items-center justify-between">
                            <div>
                                <span className="font-semibold text-foreground">
                                    {comment.author.name}
                                </span>
                                <span className="ml-2 text-sm text-muted-foreground">
                                    {formatDistanceToNow(comment.commentDate, { addSuffix: true })}
                                </span>
                            </div>
                            <p className="mt-1 text-foreground">{comment.content}</p>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
}
