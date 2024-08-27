'use client';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { EmptyState } from '@/components/ui/empty-state';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import { toast } from '@/components/ui/use-toast';
import { getStatusColor } from '@/utils/colors';
import { type Post } from '@prisma/client';
import { format } from 'date-fns';
import { SearchIcon } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useCallback, useMemo } from 'react';

import { deletePost } from '../_actions/posts';
import { useFilter } from '../_stores/filter';
import { useSelected } from '../_stores/selected';
import { DeleteDialog } from './delete-dialog';
import { Dropdown } from './dropdown';

export function PostsList({ posts }: { posts: Omit<Post, 'content'>[] }) {
    const { searchTerm, setSearchTerm, setStatusFilter, statusFilter } = useFilter();
    const { selected, setSelected } = useSelected();
    const router = useRouter();

    const resetFilters = useCallback(() => {
        setSearchTerm('');
        setStatusFilter('ALL');
    }, [setSearchTerm, setStatusFilter]);

    const handleDeletePost = useCallback(async () => {
        try {
            await deletePost(selected!);
            toast({
                description: 'Your post has been deleted.',
                title: 'Post Deleted',
            });
            setSelected(null);
            router.refresh();
        } catch (error) {
            console.error('Error deleting post:', error);
            toast({
                description: 'There was an issue deleting the post. Please try again.',
                title: 'Error',
                variant: 'destructive',
            });
        }
    }, [selected, setSelected, router]);

    const filteredPosts = useMemo(() => {
        return posts.filter(
            (post) =>
                post.title.toLowerCase().includes(searchTerm.toLowerCase()) &&
                (statusFilter === 'ALL' || post.status === statusFilter),
        );
    }, [posts, searchTerm, statusFilter]);

    if (filteredPosts.length === 0) {
        return (
            <EmptyState
                className="min-h-[70vh] border-dashed"
                description="We couldn't find any posts that match your search criteria. Try adjusting your filters or search term."
                icon={SearchIcon}
                title="No Posts Found"
            >
                <Button onClick={resetFilters} variant="outline">
                    Clear Filters
                </Button>
            </EmptyState>
        );
    }

    return (
        <>
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead className="w-[250px]">Title</TableHead>
                        <TableHead>Description</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Publish Date</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {filteredPosts.map((post) => (
                        <TableRow key={post.id}>
                            <TableCell className="font-medium">{post.title}</TableCell>
                            <TableCell>{post.description || 'N/A'}</TableCell>
                            <TableCell>
                                <Badge className={getStatusColor(post.status)}>{post.status}</Badge>
                            </TableCell>
                            <TableCell className="text-nowrap">
                                {format(post.publishDate, 'dd MMM yyyy')}
                            </TableCell>
                            <TableCell className="text-right">
                                <Dropdown postId="{post.id}" />
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
            {selected && (
                <DeleteDialog
                    onClose={() => setSelected(null)}
                    onDelete={handleDeletePost}
                    selected={selected}
                />
            )}
        </>
    );
}
