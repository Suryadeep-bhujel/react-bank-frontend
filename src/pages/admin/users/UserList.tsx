import React, { useEffect, useState } from "react";
import Pagination from "../../shared/Pagination";
import { useUserState } from "@src/states/UserState";
import DataTableV1 from "@src/pages/shared/DataTableV1";
import SearchWidget from "@src/pages/shared/SearchWidget";
import type { TableColumns } from "@src/shared/SharedInterface";
import { Link } from "react-router-dom";
const UserList: React.FC = () => {
    const {
        users,
        currentPage,
        total,
        totalPages,
        startFrom,
        tableColumns,
        actionItems,
        limit,
        isLoading,
        handlePageChange,
        handlePageSizeChange,
        handleSearch
    } = useUserState();
    return (
        <>
            <div className="">
                <div className="text-lg font-semibold text-gray-700 mb-4 flex justify-between">
                    <h1 className="text-2xl font-bold text-cyan-900 mb-4">Users List</h1>
                    <Link to="add-user" className="bg-violet-500 text-white px-4 py-2 rounded">
                        Add User
                    </Link>
                </div>
                <DataTableV1
                    tableColumns={tableColumns}
                    records={users}
                    totalPages={totalPages}
                    currentPage={currentPage}
                    limit={limit}
                    total={total}
                    updatePermission={() => { }}
                    actions={actionItems}
                    handleSearch={handleSearch}
                    startFrom={startFrom}
                    handlePageChange={handlePageChange}
                    handlePageSizeChange={handlePageSizeChange}
                />
            </div>
        </>
    );
};

export default UserList;
