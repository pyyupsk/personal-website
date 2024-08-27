import { Button } from '@/components/ui/button';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { toast } from '@/components/ui/use-toast';
import { useState } from 'react';

type Props = {
    onClose: () => void;
    onDelete: () => Promise<void>;
    selected: string;
};

export function DeleteDialog({ onClose, onDelete, selected }: Props) {
    const [deleteInputValue, setDeleteInputValue] = useState('');

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (deleteInputValue !== selected) {
            toast({
                description: 'The post title does not match.',
                title: 'Incorrect',
            });
            return;
        }

        await onDelete();
        onClose();
    };

    return (
        <Dialog onOpenChange={onClose} open>
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
                            className="col-span-3"
                            onChange={(e) => setDeleteInputValue(e.target.value)}
                            value={deleteInputValue}
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
