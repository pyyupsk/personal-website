import {
    Pagination as BasePagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from '@/components/ui/pagination';
import { cn } from '@/lib/utils';

interface Props {
    className?: string;
    current: number;
    pages: number;
}

export function Pagination({ className, current, pages }: Props) {
    // Early return if there's only one page
    if (pages <= 1) {
        return null;
    }

    const createPageLinks = () => {
        const links = [];

        // Add previous page link
        if (current > 1) {
            links.push(
                <PaginationItem key="prev">
                    <PaginationPrevious href={`/posts/${current - 1}`} />
                </PaginationItem>,
            );
        }

        // Add leading ellipsis if needed
        if (current > 3) {
            links.push(
                <PaginationItem key="ellipsis-start">
                    <PaginationEllipsis />
                </PaginationItem>,
            );
        }

        // Add page number links
        const start = Math.max(1, current - 1);
        const end = Math.min(pages, current + 1);

        for (let i = start; i <= end; i++) {
            links.push(
                <PaginationItem key={i}>
                    <PaginationLink active={i === current} href={`/posts/${i}`} size="iconx">
                        {i}
                    </PaginationLink>
                </PaginationItem>,
            );
        }

        // Add trailing ellipsis if needed
        if (current < pages - 2) {
            links.push(
                <PaginationItem key="ellipsis-end">
                    <PaginationEllipsis />
                </PaginationItem>,
            );
        }

        // Add next page link
        if (current < pages) {
            links.push(
                <PaginationItem key="next">
                    <PaginationNext href={`/posts/${current + 1}`} />
                </PaginationItem>,
            );
        }

        return links;
    };

    return (
        <BasePagination className={cn(className, { hidden: pages <= 1 })}>
            <PaginationContent>{createPageLinks()}</PaginationContent>
        </BasePagination>
    );
}
