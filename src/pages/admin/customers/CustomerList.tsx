import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { CustomerState } from "@states/CustomerState"
import Pagination from "@shared/Pagination";
import DialogModal from "@shared/DialogModal";
import { useDialogueState } from "@states/useDialogueState";
const CustomerList: React.FC = () => {
    const { customerList, handlePageChange, search, isLoading, handlePageSizeChange, customerStructure, customer, setIsLoading, saveCustomer } = CustomerState()
    const { currentPage, total, totalPages, startFrom } = search;
    const { isDialogOpen, setIsDialogOpen } = useDialogueState();
    const handCusomterformSubmit = (data: any) => {
        console.log("saving customer data", data)
        saveCustomer(data).then((res) => {
            console.log("response after saving customer", res);
            
            if (res) {
                setIsDialogOpen(false);
            }
        });
    }
    // const [loading, setLoading] = useState(true);
    // useEffect(() => {
    //     // getCustomersList();
    // }, [])
    return (
        <>
            <div className="">
                <div className="text-lg font-semibold text-gray-700 mb-4 flex justify-between">
                    <h1 className="text-2xl font-bold text-cyan-900 mb-4">Customers List</h1>
                    <button onClick={() => {
                        setIsDialogOpen(true)
                    }} data-modal-toggle="default-modal" className="block text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 cursor-pointer" type="button">
                        Add Customer
                    </button>
                    <div className="text-gray-500 justify-end">
                        <Link to="add-customer" className="bg-sky-900 text-white px-4 py-2 rounded">
                            Add Customer
                        </Link>

                    </div>
                </div>





                {isDialogOpen && (
                    <DialogModal formInputs={customer} formStructure={customerStructure} dialogType="add" dialogTitle="Add Customer" isDialogOpen={isDialogOpen} onClose={() => setIsDialogOpen(false)} onSave={(data) => handCusomterformSubmit(data)}></DialogModal>
                )}

                {/* content Area */}
                {/* <pre>{JSON.stringify(customerList, null, 2)}</pre> */}
                <table className="table-auto w-full border-collapse border border-green-600">
                    {/* <!-- <caption className="text-lg font-semibold text-gray-700 mb-4">Authors</caption> --> */}
                    <thead>
                        <tr className="bg-gray-200">
                            <th className="w-1/4 px-4 py-2">ID</th>
                            <th className="w-1/4 px-4 py-2">First Name</th>
                            <th className="w-1/4 px-4 py-2">Middle Name</th>
                            <th className="w-1/4 px-4 py-2">Last Name</th>
                            <th className="w-1/4 px-4 py-2">Email</th>
                            <th className="w-1/4 px-4 py-2">Phone No.</th>
                            <th className="w-1/4 px-4 py-2">DOB</th>
                            <th className="w-1/4 px-4 py-2">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {customerList.map((customerItem) => (
                            <tr className="border-b" key={customerItem.id}>
                                <>
                                    <td className="px-4 py-2">{customerItem?.id} </td>
                                    <td className="px-4 py-2">{customerItem?.firstName} </td>
                                    <td className="px-4 py-2">{customerItem?.middleName} </td>
                                    <td className="px-4 py-2">{customerItem?.lastName} </td>
                                    <td className="px-4 py-2"> {customerItem.email} </td>
                                    <td className="px-4 py-2"> {customerItem?.phoneNumber} </td>
                                    <td className="px-4 py-2"> {customerItem.dateOfBirth} </td>
                                    <td className="px-4 py-2 flex justify-center-safe">
                                        <button className="text-blue-500 hover:underline">
                                            Edit
                                        </button>
                                        <button className="text-red-500 hover:underline ml-2">
                                            Delete
                                        </button>
                                    </td>
                                </>
                            </tr>
                        ))}
                    </tbody>
                    <tfoot>
                        <tr>
                            <td className="text-center py-2" colSpan={4}>
                                {!isLoading && (
                                    <Pagination
                                        totalPages={totalPages}
                                        startFrom={startFrom}
                                        records={customerList.length}
                                        total={total}
                                        currentPage={currentPage}
                                        pageChanged={handlePageChange}
                                        pageSizeChanged={handlePageSizeChange}
                                    />
                                )}
                            </td>
                        </tr>
                    </tfoot>
                </table>
            </div>
        </>
    )
}
export default CustomerList