import React from "react";
import { Link } from "react-router-dom";
import { useBankAccountState } from "@states/useBankAccountState"
import Pagination from "@src/pages/shared/Pagination";
import DataTableV1 from "@src/pages/shared/DataTableV1";
import SearchWidget from "@src/pages/shared/SearchWidget";
const BankAccount: React.FC = () => {
    const {
        bankAccountList,
        errors,
        setErrors,
        isLoading,
        search,
        handlePageSizeChange,
        handlePageChange,
        limit,
        tableColumns,
        actionItems,
        handleSearch
    } = useBankAccountState();
    const { currentPage, total, totalPages, startFrom } = search;
    return (
        <>
            <div className="">
                <div className="text-lg font-semibold text-gray-700 mb-4 flex justify-between">
                    <h1 className="text-2xl font-bold text-cyan-900 mb-4">Account List</h1>
                    {/* <button onClick={() => {
                        // openAddAccountModal();
                    }} data-modal-toggle="default-modal" className="block text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 cursor-pointer" type="button">
                        Add Account
                    </button> */}
                    <Link to="add" className="block text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 pt-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 cursor-pointer">
                        Add Account
                    </Link>

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
                    tableColumns={tableColumns}
                    records={bankAccountList}
                    totalPages={totalPages}
                    currentPage={currentPage}
                    limit={limit}
                    updatePermission={() => { }}
                    actions={actionItems}
                    handleSearch={handleSearch}
                    startFrom={startFrom}
                    total={total}
                    handlePageChange={handlePageChange}
                    handlePageSizeChange={handlePageSizeChange}

                />
            </div>
        </>
    );
};
export default BankAccount;
