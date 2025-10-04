import React from "react";
import { useUserState } from "@src/states/UserState";
import DataTableV1 from "@src/pages/shared/DataTableV1";
import { Link } from "react-router-dom";
import DialogModal from "@src/pages/shared/DialogModal";
const UserList: React.FC = () => {
    const {
        users,
        currentPage,
        total,
        totalPages,
        startFrom,
        tableColumns,
        limit,
        handlePageChange,
        handlePageSizeChange,
        handleSearch,
        isDialogOpen,
        roleDialogType,
        roleFormTitle,
        roleFormStructure,
        roleFormModel,
        roleErrors,
        setIsDialogOpen,
        handleRoleFormSubmit,
        
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
                    handleSearch={handleSearch}
                    startFrom={startFrom}
                    handlePageChange={handlePageChange}
                    handlePageSizeChange={handlePageSizeChange}
                />
                {isDialogOpen && (
                    <DialogModal
                        formModal={roleFormModel}
                        formStructure={roleFormStructure}
                        dialogType={roleDialogType}
                        dialogTitle={roleFormTitle}
                        isDialogOpen={isDialogOpen}
                        onClose={() => setIsDialogOpen(false)}
                        onSave={(data) => handleRoleFormSubmit(data)}
                        formErrors={roleErrors}
                        rows={1}
                    />
                )}
            </div>
        </>
    );
};

export default UserList;
