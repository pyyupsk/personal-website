import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { toast } from "@/components/ui/use-toast";
import { useState } from "react";

type Props = {
    selected: string;
    onClose: () => void;
    onDelete: () => Promise<void>;
};

export function DeleteDialog({ selected, onClose, onDelete }: Props) {
    const [deleteInputValue, setDeleteInputValue] = useState("");

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (deleteInputValue !== selected) {
            toast({
                title: "Incorrect",
                description: "The post title does not match.",
            });
            return;
        }

        await onDelete();
        onClose();
    };

    return (
        <Dialog open onOpenChange={onClose}>
            <form onSubmit={handleSubmit}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Delete Post</DialogTitle>
                        <DialogDescription>
                            Are you sure you want to delete this post?
                        </DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-2">
                        <p>
                            Please type the <code>{selected}</code> to confirm your deletion.
                        </p>
                        <Input
                            value={deleteInputValue}
                            onChange={(e) => setDeleteInputValue(e.target.value)}
                            className="col-span-3"
                        />
                    </div>
                    <DialogFooter>
                        <Button type="submit" variant="destructive">
                            Delete Post
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </form>
        </Dialog>
    );
}
