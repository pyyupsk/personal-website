"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

export function Comment() {
    return (
        <div className="space-y-6">
            <div className="space-y-2">
                <h2>Comments</h2>
                <p className="text-sm text-muted-foreground">
                    Share your thoughts and feedback on this article.
                </p>
            </div>
            <form className="grid gap-4">
                <Textarea placeholder="Write your comment here..." rows={4} className="p-4" />
                <Button variant="secondary" type="submit" className="justify-self-end">
                    Submit
                </Button>
            </form>
            <div className="grid gap-4">
                <div className="flex items-start gap-4">
                    <Avatar className="size-10 border">
                        <AvatarImage src="/placeholder-user.jpg" alt="John Doe" />
                        <AvatarFallback>JD</AvatarFallback>
                    </Avatar>
                    <div className="space-y-1">
                        <div className="flex items-center gap-2">
                            <div className="font-medium">John Doe</div>
                            <div className="text-xs text-muted-foreground">2 hours ago</div>
                        </div>
                        <p className="text-sm">
                            This was a really insightful article. I learned a lot about the history
                            of airplane turbulence and how it affects passengers. Thanks for
                            sharing!
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
