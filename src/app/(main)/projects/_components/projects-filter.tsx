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
import { type Options } from 'nuqs';
import { useEffect, useState } from 'react';

type Props = {
    setStatus: (
        // eslint-disable-next-line no-unused-vars
        value: ((old: string) => null | string) | null | string,
        // eslint-disable-next-line no-unused-vars
        options?: Options,
    ) => Promise<URLSearchParams>;
    setTitle: (
        // eslint-disable-next-line no-unused-vars
        value: ((old: string) => null | string) | null | string,
        // eslint-disable-next-line no-unused-vars
        options?: Options,
    ) => Promise<URLSearchParams>;
    status: string;
    title: string;
};

export function ProjectsFilter({ setStatus, setTitle, status, title }: Props) {
    const [mounted, setMounted] = useState(false);

    useEffect(() => setMounted(true), []);

    if (!mounted) {
        return (
            <section className="flex items-center justify-between gap-4">
                <Skeleton className="h-8 w-full sm:w-64" />
                <Skeleton className="h-8 w-full sm:w-40" />
            </section>
        );
    }

    return (
        <section className="flex items-center justify-between gap-4">
            <div className="relative w-full sm:w-64">
                <SearchIcon className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                    className="pl-8"
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Search projects..."
                    type="text"
                    value={title}
                />
            </div>
            <Select onValueChange={setStatus} value={status}>
                <SelectTrigger aria-label="Filter by status" className="w-56">
                    <SelectValue placeholder="Filter by status" />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="ALL">All Statuses</SelectItem>
                    <SelectItem value="NOT_STARTED">Not Started</SelectItem>
                    <SelectItem value="IN_PROGRESS">In Progress</SelectItem>
                    <SelectItem value="COMPLETED">Completed</SelectItem>
                    <SelectItem value="ON_HOLD">On Hold</SelectItem>
                </SelectContent>
            </Select>
        </section>
    );
}
