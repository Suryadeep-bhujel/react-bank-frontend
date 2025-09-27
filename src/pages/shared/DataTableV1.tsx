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
                        <th className="w-1/4 px-4 py-2 text-left">S.N</th>
                        {(tableColumns && tableColumns.length) && tableColumns.map((tableColumnObj) => (
                            <th className="w-1/4 px-4 py-2 text-left">{tableColumnObj.name || tableColumnObj.label}</th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {records.map((recordItem, index) => (
                        <tr className="border-b" key={recordItem.id}>
                            <>
                                <td className="px-4 py-2">{(currentPage > 1 ? (currentPage - 1) * (limit || 100) : 1) + index}</td>
                                {tableColumns.map((fieldItem: TableColumnStructure) => (
                                    <>
                                        <td className="px-4 py-2">
                                            {fieldItem.dataType !== "action" && (recordItem[fieldItem.fieldName])}
                                            {fieldItem?.dataType === 'action' && fieldItem?.actions && fieldItem?.actions.length && (
                                                <>
                                                    <div className="flex mx-1">
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