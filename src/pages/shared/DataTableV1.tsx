import type { ListTableInterface, TableColumnStructure } from "@src/shared/SharedInterface";
import React from "react";
import Pagination from "@shared/Pagination";
import SearchWidget from "@src/pages/shared/SearchWidget";
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
                                                    <div className="flex mx-1">
                                                        {/*  add three dots expandable icon and on click show the list of actions menu below */}
                                                        {/* TODO add dotted options */}
                                                        {/* <button className="block text-white bg-sky-700 hover:bg-blue-300 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-2 py-2 mx-0.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 cursor-pointer">
                                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
                                                                <path stroke-linecap="round" stroke-linejoin="round" d="M12 6.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5ZM12 12.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5ZM12 18.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5Z" />
                                                            </svg>

                                                        </button> */}

                                                        {fieldItem?.actions.map(actionItem => (
                                                            <button onClick={(e) => { e.preventDefault(); actionItem.action(recordItem) }} type="button" className="block text-white bg-sky-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-6 py-2 mx-0.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 cursor-pointer">
                                                                {actionItem.buttonName}
                                                            </button>
                                                        ))}
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