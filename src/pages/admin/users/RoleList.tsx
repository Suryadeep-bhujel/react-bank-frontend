import React from "react";
import { Link } from "react-router-dom";
import DataTableV1 from "@shared/DataTableV1"
import { RoleState } from "@states/RolePermissionState"
const RoleList: React.FC = () => {

    const { records, handlePageChange, search, isLoading, handlePageSizeChange, tableColumns } = RoleState()
    const { currentPage, total, totalPages, startFrom, limit } = search;
    return (
        <>
            <div className="">
                <div className="text-lg font-semibold text-gray-700 mb-4 flex justify-between">
                    <h1 className="text-2xl font-bold text-cyan-900 mb-4">
                        Roles List
                    </h1>
                    <div className="text-gray-500 justify-end">
                        <Link
                            to="/roles/add-role"
                            className="bg-sky-600 text-white px-4 py-2 rounded hover:ring-gray-500"
                        >
                            Add Role
                        </Link>
                    </div>
                </div>
                {/* content Area */}
                <DataTableV1
                    tableColumns={tableColumns}
                    records={records}
                    totalPages={totalPages}
                    currentPage={currentPage}
                    limit={limit}
                    handlePageChange={handlePageChange}
                    handlePageSizeChange={handlePageSizeChange}
                    actions={[]}
                />

            </div>
        </>
    );
};
export default RoleList;
