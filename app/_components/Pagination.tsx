'use client';

import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "@/app/_components/ui/pagination";
import { usePathname, useSearchParams } from "next/navigation";

// Import the generatePagination function
import { generatePagination } from "@/app/_utils/helpers";

export default function PaginationButtons({ totalPages }: { totalPages: number }) {
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const currentPage = Number(searchParams.get("page")) || 1;

    function createPageURL(pageNumber: number | string) {
        const validPageNumber = Math.max(1, Math.min(Number(pageNumber), totalPages));
        const params = new URLSearchParams(searchParams);
        params.set('page', validPageNumber.toString());

        return `${pathname}?${params.toString()}`;
    }

    // Generate the pages array using the generatePagination function
    const pages = generatePagination(currentPage, totalPages);

    return (
        <Pagination>
            <PaginationContent>
                <PaginationItem>
                    <PaginationPrevious
                        href={createPageURL(currentPage - 1)}
                        aria-disabled={currentPage <= 1}
                        tabIndex={currentPage <= 1 ? -1 : undefined}
                        className={currentPage <= 1 ? 'opacity-50 cursor-not-allowed' : undefined}
                    />
                </PaginationItem>
                {pages.map((page, index) => (
                    <PaginationItem key={index}>
                        {page === '...' ? (
                            <PaginationEllipsis />
                        ) : (
                            <PaginationLink href={createPageURL(page)} isActive={currentPage === page}  >
                                {page}
                            </PaginationLink>
                        )}
                    </PaginationItem>
                ))}
                <PaginationItem>
                    <PaginationNext
                        href={createPageURL(currentPage + 1)}
                        aria-disabled={currentPage >= totalPages}
                        tabIndex={currentPage >= totalPages ? totalPages + 1 : undefined}
                        className={currentPage >= totalPages ? 'opacity-50 cursor-not-allowed' : undefined}
                    />
                </PaginationItem>
            </PaginationContent>
        </Pagination>
    );
}
