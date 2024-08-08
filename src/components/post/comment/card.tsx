import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { clerkClient } from "@clerk/nextjs/server";
import { Comments } from "@prisma/client";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

dayjs.extend(relativeTime);

export async function Card({ comment }: { comment: Comments }) {
    const user = await clerkClient().users.getUser(comment.clerkId);

    const displayName = user.username || user.emailAddresses[0].emailAddress;

    return (
        <div className="flex items-start gap-4">
            <Avatar className="size-10 border">
                <AvatarImage src={user.imageUrl} alt={displayName} />
                <AvatarFallback>{displayName.substring(0, 2).toUpperCase()}</AvatarFallback>
            </Avatar>
            <div className="space-y-1">
                <div className="flex items-center gap-2">
                    <div className="font-medium">{displayName}</div>
                    <div className="text-xs text-muted-foreground">
                        {dayjs(comment.createdAt).fromNow()}
                    </div>
                </div>
                <p className="text-sm">{comment.content}</p>
            </div>
        </div>
    );
}
