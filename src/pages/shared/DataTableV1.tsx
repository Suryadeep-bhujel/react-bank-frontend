import type { ColumnTypeInterface, ListTableInterface } from "@src/shared/SharedInterface";
import React from "react";

const ListTable: React.FC<ListTableInterface> = ({ tableColumns, records, currentPage, totalPages, limit, updatePermission, actions}) => {
    const permissionClicked = async (roldOid : string) => {
        console.log("roldOid", roldOid)
        updatePermission(roldOid)
    }
    return (
        <>
            <table className="table-auto w-full border-collapse border border-green-600">
                <thead>
                    <tr className="bg-gray-200">
                        <th className="w-1/4 px-4 py-2 text-left">S.N</th>
                        {(tableColumns && tableColumns.length) && tableColumns.map((tableColumnObj) => (
                            <th className="w-1/4 px-4 py-2 text-left">{tableColumnObj.name || tableColumnObj.label}</th>
                        ))}
                        {/* <th className="w-1/4 px-4 py-2">Actions</th> */}
                    </tr>
                </thead>
                <tbody>
                        {records.map((recordItem , index) => (
                            <tr className="border-b" key={recordItem.id}>
                                <>
                                <td className="px-4 py-2">{(currentPage > 1 ? (currentPage - 1) * (limit || 100) : 1) + index }</td>
                                    {tableColumns.map((fieldItem : ColumnTypeInterface) => (
                                        <>
                                        { fieldItem.dataType !== "action" && (
                                        <td className="px-4 py-2">{recordItem[fieldItem.fieldName]} </td>
                                        )}
                                        </>
                                    ))}
                                    {actions && actions.length > 0 && (
                                         <td className="px-4 py-2 flex justify-center-safe">
                                            {actions.map(actionButtonItem => (
                                            <button onClick={(e) => { e.preventDefault(); actionButtonItem.onClick(recordItem) }} type="button" className="block text-white bg-sky-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-6 py-2 mx-0.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 cursor-pointer">
                                                {actionButtonItem.buttonName}
                                            </button>

                                            ))}
                                            {/* <button onClick={(e) => {
                                                e.preventDefault();
                                                permissionClicked(recordItem._oid)
                                            }} type="button" className="text-cyan-500 hover:underline ml-2">
                                                Permissions
                                            </button> */}
                                           
                                        </td>
                                    )}
                                </>
                            </tr>
                        ))}
                    </tbody>
            </table>
        </>
    )
}
export default ListTable;