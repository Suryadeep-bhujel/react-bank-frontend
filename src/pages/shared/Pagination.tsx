import type { PaginationProps } from "@src/shared/SharedInterface";
import React from "react";

const Pagination: React.FC<PaginationProps> = ({
    totalPages,
    startFrom,
    records,
    total,
    currentPage,
    pageChanged,
    pageSizeChanged,
}) => {
    const generatePages = () => {
        const pages = [];
        const maxShown = 10;

        if (totalPages <= maxShown) {
            for (let i = 1; i <= totalPages; i++) {
                pages.push(i);
            }
        } else {
            const left = Math.max(2, currentPage - 1);
            const right = Math.min(totalPages - 1, currentPage + 1);

            pages.push(1);

            if (left > 2) {
                pages.push("...");
            }

            for (let i = left; i <= right; i++) {
                pages.push(i);
            }

            if (right < totalPages - 1) {
                pages.push("...");
            }

            pages.push(totalPages);
        }

        return pages;
    };
    const onPageChange = (currentPage: number) => {
        // alert("hello")
        pageChanged(currentPage)

        console.log(currentPage, 'current page')
    };
    const onPageSizeChange = async (pageSize : number) => {
        console.log("pageSizepageSize", pageSize)
        pageSizeChanged(pageSize)
    }

    const pages = generatePages();
    return (
        <>
            <div className="flex items-center justify-between border-t border-gray-200 bg-white px-4 py-3 sm:px-6">
                <div className="flex flex-1 justify-between sm:hidden">
                    <a
                        href="#"
                        className="relative inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
                    >
                        Previous
                    </a>
                    <a
                        href="#"
                        className="relative ml-3 inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
                    >
                        Next
                    </a>
                </div>
                <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
                    <div>
                        <p className="text-sm text-gray-700">
                            Showing
                            <span className="font-medium pr-1 pl-1">{startFrom}</span>
                            to
                            <span className="font-medium pr-1"> {records}</span>
                            of
                            <span className="font-medium  pl-1 pr-1">{total}</span>
                            results
                        </p>
                    </div>
                    <div>
                        <label htmlFor="pagination-page-size">Page Size</label>
                        <select onChange={(e) => {
                            e.preventDefault()
                            // console.log("esdflkjsfdsdf", e)
                            onPageSizeChange(Number(e.target.value))
                        }} name="pagination-page-size" id="pagination-page-size">
                            <option value="10">10</option>
                            <option value="20">20</option>
                            <option value="100">100</option>
                            <option value="500">500</option>
                            <option value="1000">1000</option>
                        </select>
                    </div>
                    <div>
                        <nav
                            className="isolate inline-flex -space-x-px rounded-md shadow-xs"
                            aria-label="Pagination"
                        >
                            <a
                                href="#" onClick={(e) => {
                                    e.preventDefault();
                                    if(currentPage >1) onPageChange(Number(currentPage)-1)
                                }}
                                className="relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 ring-1 ring-gray-300 ring-inset hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
                            >
                                <span className="sr-only">Previous</span>
                                <svg
                                    className="size-5"
                                    viewBox="0 0 20 20"
                                    fill="currentColor"
                                    aria-hidden="true"
                                    data-slot="icon"
                                >
                                    <path
                                        fillRule="evenodd"
                                        d="M11.78 5.22a.75.75 0 0 1 0 1.06L8.06 10l3.72 3.72a.75.75 0 1 1-1.06 1.06l-4.25-4.25a.75.75 0 0 1 0-1.06l4.25-4.25a.75.75 0 0 1 1.06 0Z"
                                        clipRule="evenodd"
                                    />
                                </svg>
                            </a>
                            {pages.map((page, index) => (
                                <a
                                    key={index}
                                    href="#"
                                    onClick={(e) => {
                                        e.preventDefault();
                                        if (page !== '...') onPageChange(Number(page));
                                    }}
                                    className={`relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-900 ring-1 ring-gray-300 ring-inset hover:bg-gray-50 focus:z-20 focus:outline-offset-0 ${currentPage === page ? 'bg-indigo-400' : ''}`}
                                >
                                    {page}
                                </a>
                            ))}
                            <a
                                href="#" onClick={(e) => {
                                    e.preventDefault();
                                    if(currentPage < totalPages) onPageChange(Number(currentPage)+1)
                                }}
                                className="relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 ring-1 ring-gray-300 ring-inset hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
                            >
                                <span className="sr-only">Next</span>
                                <svg
                                    className="size-5"
                                    viewBox="0 0 20 20"
                                    fill="currentColor"
                                    aria-hidden="true"
                                    data-slot="icon"
                                >
                                    <path
                                        fillRule="evenodd"
                                        d="M8.22 5.22a.75.75 0 0 1 1.06 0l4.25 4.25a.75.75 0 0 1 0 1.06l-4.25 4.25a.75.75 0 0 1-1.06-1.06L11.94 10 8.22 6.28a.75.75 0 0 1 0-1.06Z"
                                        clipRule="evenodd"
                                    />
                                </svg>
                            </a>
                        </nav>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Pagination;
