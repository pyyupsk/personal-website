import { Button } from '@/components/ui/button';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Eye, Link, MoreVertical, Pencil, Trash2 } from 'lucide-react';
import { useSelected } from '../_stores/selected';

export function Dropdown({ postId }: { postId: string }) {
    const { setSelected } = useSelected();

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="size-8 p-0">
                    <span className="sr-only">Open menu</span>
                    <MoreVertical className="size-4" />
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuLabel>Actions</DropdownMenuLabel>
                <Link href={`/post/${postId}`} target="_blank">
                    <DropdownMenuItem>
                        <Eye className="mr-2 size-4" />
                        View
                    </DropdownMenuItem>
                </Link>
                <Link href={`/dashboard/posts/${postId}`} target="_blank">
                    <DropdownMenuItem>
                        <Pencil className="mr-2 size-4" />
                        Edit
                    </DropdownMenuItem>
                </Link>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => setSelected(postId)}>
                    <Trash2 className="mr-2 size-4" />
                    Delete
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}
