'use client';

import { Input } from '@/components/ui/input';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { Skeleton } from '@/components/ui/skeleton';
import { SearchIcon } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useFilter } from '../_stores/filter';

export function PostsFilter() {
    const [mounted, setMounted] = useState(false);
    const { searchTerm, setSearchTerm, statusFilter, setStatusFilter } = useFilter();

    useEffect(() => setMounted(true), []);

    if (!mounted) {
        return (
            <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
                <Skeleton className="h-8 w-full sm:w-64" />
                <Skeleton className="h-8 w-full sm:w-40" />
            </div>
        );
    }

    return (
        <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
            <div className="relative w-full sm:w-64">
                <SearchIcon className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                    type="text"
                    placeholder="Search posts..."
                    className="h-10 pl-8"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger aria-label="Filter by status" className="h-10 w-full sm:w-40">
                    <SelectValue placeholder="Filter by status" />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="ALL">All Statuses</SelectItem>
                    <SelectItem value="DRAFT">Draft</SelectItem>
                    <SelectItem value="PUBLISHED">Published</SelectItem>
                    <SelectItem value="ARCHIVED">Archived</SelectItem>
                </SelectContent>
            </Select>
        </div>
    );
}
