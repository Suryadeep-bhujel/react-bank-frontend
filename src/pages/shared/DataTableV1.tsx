import type { ListTableInterface, TableColumnStructure } from "@src/shared/SharedInterface";
import React, { useState, useEffect } from "react";
import Pagination from "@shared/Pagination";
import SearchWidget from "@src/pages/shared/SearchWidget";
import { fi } from "@faker-js/faker";
const ListTable: React.FC<ListTableInterface> = ({
    tableColumns,
    records,
    currentPage,
    totalPages,
    limit,
    actions,
    total,
    startFrom,
    paginationSpace = 'bottom',
    handlePageChange,
    handlePageSizeChange,
    handleSearch
}) => {
    // State to track which dropdown is open
    const [openDropdownId, setOpenDropdownId] = useState<string | null>(null);

    // Handle click outside to close dropdown
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            const target = event.target as HTMLElement;
            // Check if the clicked element is not within any dropdown or three dots button
            if (!target.closest('.dropdown-container')) {
                setOpenDropdownId(null);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    const toggleDropdown = (recordId: string) => {
        setOpenDropdownId(openDropdownId === recordId ? null : recordId);
    };

    const calculateToRecordCount = () => {
        const to = ((currentPage > 1 ? currentPage - 1 : 0) * limit) + records.length
        return to;
    }
    const calculateFromRecordCount = () => {

    }
    return (
        <>
            <SearchWidget
                fields={tableColumns}
                onSearch={(fieldName, fieldValue) => handleSearch(fieldName, fieldValue)}
            />
            {paginationSpace === 'top' &&
                <Pagination
                    totalPages={totalPages}
                    startFrom={startFrom || 0}
                    records={calculateToRecordCount()}
                    total={total || 0}
                    currentPage={currentPage}
                    pageChanged={handlePageChange}
                    pageSizeChanged={handlePageSizeChange}
                />
            }
            <table className="table-auto w-full border-collapse border border-green-600">
                <thead>
                    <tr className="bg-gray-200">
                        <th className="w-1/4 px-4 py-2 text-left whitespace-nowrap">S.N</th>
                        {(tableColumns && tableColumns.length) && tableColumns.map((tableColumnObj) => (
                            <th className="w-1/4 px-4 py-2 text-left whitespace-nowrap">{tableColumnObj.name || tableColumnObj.label}</th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {records.map((recordItem, index) => (
                        <tr className="border-b hover:bg-blue-200" key={recordItem.id}>
                            <>
                                <td className="px-4 py-2 whitespace-nowrap">{(currentPage > 1 ? (currentPage - 1) * (limit || 100) : 1) + index}</td>
                                {tableColumns.map((fieldItem: TableColumnStructure) => (
                                    <>
                                        <td className="px-4 py-2">
                                            {fieldItem.dataType !== "action" && (recordItem[fieldItem.fieldName])}
                                            {fieldItem?.dataType === 'action' && fieldItem?.actions && fieldItem?.actions.length && (
                                                <>
                                                    <div className="relative dropdown-container">
                                                        {/* Three dots button */}
                                                        <button 
                                                            onClick={() => toggleDropdown(recordItem.id)} 
                                                            className="inline-flex items-center justify-center w-8 h-8 text-gray-500 bg-white border border-gray-300 rounded-full hover:text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-200"
                                                        >
                                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-5 h-5">
                                                                <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5ZM12 12.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5ZM12 18.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5Z" />
                                                            </svg>
                                                        </button>

                                                        {/* Dropdown menu */}
                                                        {openDropdownId === recordItem.id && (
                                                            <div className="absolute right-0 mt-2 w-40 bg-white border border-gray-200 rounded-md shadow-lg z-50 transition-all duration-200 ease-in-out transform origin-top-right animate-in fade-in zoom-in-95">
                                                                <div className="py-1">
                                                                    {fieldItem?.actions.map((actionItem, actionIndex) => (
                                                                        <button 
                                                                            key={actionIndex}
                                                                            onClick={(e) => { 
                                                                                e.preventDefault(); 
                                                                                actionItem.action(recordItem);
                                                                                setOpenDropdownId(null); // Close dropdown after action
                                                                            }} 
                                                                            className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900 transition-colors duration-150 focus:outline-none focus:bg-gray-100"
                                                                        >
                                                                            {actionItem.buttonName}
                                                                        </button>
                                                                    ))}
                                                                </div>
                                                            </div>
                                                        )}
                                                    </div>
                                                </>
                                            )}
                                        </td>
                                    </>
                                ))}
                            </>
                        </tr>
                    ))}
                </tbody>
            </table>
            {paginationSpace === 'bottom' &&
                <Pagination
                    totalPages={totalPages}
                    startFrom={startFrom || 0}
                    records={calculateToRecordCount()}
                    total={total || 0}
                    currentPage={currentPage}
                    pageChanged={handlePageChange}
                    pageSizeChanged={handlePageSizeChange}
                />
            }
        </>
    )
}
export default ListTable;