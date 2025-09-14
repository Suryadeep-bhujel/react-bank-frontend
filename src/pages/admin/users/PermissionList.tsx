import React from "react";
import DataTableV1 from "@shared/DataTableV1"
import { PermissionState } from "@states/PermissionState"
const PermissionList: React.FC = () => {

    const { fetchListItems,
        handlePageChange,
        handlePageSizeChange,
        records,
        search,
        isLoading, tableColumns } = PermissionState();
        const { currentPage, total, totalPages, startFrom, limit } = search;
    return (
        <>
            <div className="">
                <div className="text-lg font-semibold text-gray-700 mb-4 flex justify-between">
                    <h1 className="text-2xl font-bold text-cyan-900 mb-4">
                        Permission List
                    </h1>
                </div>
                {/* content Area */}
                <DataTableV1 tableColumns={tableColumns} records={records} totalPages={totalPages} currentPage={currentPage} limit={limit} />
            </div>
        </>
    )
}
export default PermissionList;