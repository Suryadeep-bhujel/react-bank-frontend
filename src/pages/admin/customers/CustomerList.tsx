import React, { useEffect, useState } from "react";
import { CustomerState, type CustomerInterface } from "@states/CustomerState"
import DialogModal from "@shared/DialogModal";
import { useDialogueState } from "@states/useDialogueState";
import DataTableV1 from "@shared/DataTableV1"
const CustomerList: React.FC = () => {
    const {
        customerList,
        handlePageChange,
        search,
        isLoading,
        handlePageSizeChange,
        customerStructure,
        customer,
        setIsLoading,
        saveCustomer,
        resetCustomerForm,
        setCustomerForm,
        dialogTitle,
        setDialogTitle,
        errors,
        setErrors,
        handleSearch,
        limit

    } = CustomerState()
    const { currentPage, total, totalPages, startFrom } = search;
    const { isDialogOpen, setIsDialogOpen } = useDialogueState();
    let dialogType = "add";
    let customerForm = customer;
    const handCusomterformSubmit = (data: any) => {
        // console.log("saving customer data", data)
        saveCustomer(data).then((res) => {
            console.log("response after saving customer", res);
            customerForm = resetCustomerForm;
            console.log("resresresresres", res.message)
            if (res.success) {
                setIsDialogOpen(false);
            }
        });
    }
    const openAddCustomerModal = () => {
        setDialogTitle("Add Customer")
        customerForm = { ...resetCustomerForm };
        setCustomerForm({ ...resetCustomerForm });
        dialogType = "add";
        setIsDialogOpen(true);
        setErrors("")
    }
    const handleEditCustomer = (customerOid: string) => {
        let customerRecord = customerList.find((customerItem) => customerItem?._oid === customerOid);
        if (customerRecord) {
            customerRecord.dateOfBirth = customerRecord?.dateOfBirth?.split("T")?.[0];
            customerForm = customerRecord;
            setErrors("")
            setCustomerForm({ ...customerRecord });
            dialogType = "edit";
            setDialogTitle("Edit Customer");
            setIsDialogOpen(true);
        }
    }
    const actionItems = [
        {
            buttonName: "Edit",
            action: "edit",
            color: "blue",
            icon: "fa fa-edit",
            onClick: (recordItem: CustomerInterface) => {
                handleEditCustomer(recordItem._oid);
            }
        }
    ]

    return (
        <>
            <div className="">
                <div className="text-lg font-semibold text-gray-700 mb-4 flex justify-between">
                    <h1 className="text-2xl font-bold text-cyan-900 mb-4">Customers List</h1>
                    <button onClick={() => {
                        openAddCustomerModal();
                    }} data-modal-toggle="default-modal" className="block text-white bg-blue-700 hover:bg-indigo-400 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 cursor-pointer" type="button">
                        Add Customer
                    </button>
                </div>

                {isDialogOpen && (
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
                )}
                <DataTableV1
                    tableColumns={customerStructure}
                    records={customerList}
                    totalPages={totalPages}
                    currentPage={currentPage}
                    limit={limit}
                    updatePermission={() => { }}
                    actions={actionItems}
                    handleSearch={handleSearch}
                    total={total}
                    startFrom={startFrom}
                    handlePageChange={handlePageChange}
                    handlePageSizeChange={handlePageSizeChange}
                >
                </DataTableV1>

            </div>
        </>
    )
}
export default CustomerList