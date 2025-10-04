import DataTableV1 from "@src/pages/shared/DataTableV1";
import { useBranchManagerState } from "@states/useBranchManagerState";
import React from "react";
const BranchManagerList: React.FC = () => {
    const { 
        branchManagers,
        errors,
        listTableStructure,
        handlePageChange,
        handlePageSizeChange,
        handleSearch,
        search
    } = useBranchManagerState();
    const { startFrom, totalPages, currentPage, limit, total } = search
    return (
        <>
            <div className="">
                <div className="text-lg font-semibold text-gray-700 mb-4 flex justify-between">
                    <h1 className="text-2xl font-bold text-cyan-900 mb-4">Branch Managers List</h1>
                    <button onClick={() => {
                        // openAddBranchManagerModal();
                    }} data-modal-toggle="default-modal" className="block text-white bg-blue-700 hover:bg-indigo-400 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 cursor-pointer" type="button">
                        Add Branch Manager
                    </button>
                </div>

                {/* {isDialogOpen && (
                    <DialogModal
                        formInputs={customerForm}
                        formStructure={customerStructure}
                        dialogType={dialogType}
                        dialogTitle={dialogTitle}
                        isDialogOpen={isDialogOpen}
                        onClose={() => setIsDialogOpen(false)}
                        onSave={(data) => handCusomterformSubmit(data)}
                        formErrors={errors}
                    ></DialogModal>
                )} */}
                <DataTableV1
                    tableColumns={listTableStructure}
                    records={branchManagers}
                    totalPages={totalPages}
                    currentPage={currentPage}
                    limit={limit}
                    handleSearch={handleSearch}
                    total={total}
                    startFrom={startFrom}
                    handlePageChange={handlePageChange}
                    handlePageSizeChange={handlePageSizeChange}
                />

            </div>
        </>
    )
}
export default BranchManagerList