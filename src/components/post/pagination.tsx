import {
    Pagination as BasePagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "@/components/ui/pagination";
import { cn } from "@/lib/utils";

export function Pagination({ current, pages }: { current: number; pages: number }) {
    return (
        <BasePagination className={cn({ hidden: pages === 1 })}>
            <PaginationContent>
                {current > 1 && (
                    <PaginationItem>
                        <PaginationPrevious href={`/posts/${current - 1}`} />
                    </PaginationItem>
                )}
                {current > 2 && (
                    <PaginationItem>
                        <PaginationEllipsis />
                    </PaginationItem>
                )}
                {Array.from({ length: pages }).map((_, index) => (
                    <PaginationItem key={index}>
                        <PaginationLink
                            href={`/posts/${index + 1}`}
                            isActive={index + 1 === current}
                        >
                            {index + 1}
                        </PaginationLink>
                    </PaginationItem>
                ))}
                {current < pages - 1 && (
                    <PaginationItem>
                        <PaginationEllipsis />
                    </PaginationItem>
                )}
                {current < pages && (
                    <PaginationItem>
                        <PaginationNext href={`/posts/${current + 1}`} />
                    </PaginationItem>
                )}
            </PaginationContent>
        </BasePagination>
    );
}
