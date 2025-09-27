import FormWidget from "@src/pages/shared/FormWidget";
import React from "react";
import { Link } from "react-router-dom";
import { useAddUpdateBankAccountState } from "@src/states/useAddUpdateBankAccountState"
const AddUpdateBankAccount: React.FC = () => {
    const {
        kycStructure,
        bankAccountDetail,
        personalDetailStructure,
        permanentAddressStructure,
        residentialAddressStructure,
        correspondingAddressStructure,
        commuincationStructure,
        submitForm,
        errors,
        bankDetailModel,
        setBankDetailModel,
        permanentAddressModel,
        residentialAddressModel,
        correspondingAddressModel,
        personalDetailModel,
        communicationModel,
        kycModel,
        setPersonalDetailModel,
        setPermanentAddressModel,
        setResidentialAddressModel,
        setCorrespondingAddressModel,
        setCommunicationModel,
        setKycModel,
        addOnDetailModel,
        addOnFormStructure,
        setAddOnDetailState,
        updateAddressSame,
        isResidentAddSameAsPmAdd
    } = useAddUpdateBankAccountState()

    const formUpdated = (formData: any) => {
        console.log("formData", formData);
    }
    const handleInputChange = (e: any) => {
        // console.log("e is dsfjskdfljsdfkljsdf", e)
        const { name, value } = e.target;
        setBankDetailModel((prev) => ({
            ...prev,
            [name]: value,
        }));
    };
    return (
        <>
            <div className="">
                <div className="text-lg font-semibold text-gray-700 mb-4 flex justify-between">
                    <h1 className="text-2xl font-bold text-cyan-900 mb-4">Add/Update Account</h1>
                    <Link to="/accounts" className="bg-sky-900 text-white px-4 py-2 rounded">
                        Account List
                    </Link>
                </div>


                <div className="border-b border-gray-200 dark:border-gray-700">
                    <ul className="flex flex-wrap -mb-px text-sm font-medium text-center text-gray-500 dark:text-gray-400">
                        <li className="me-2">
                            <a href="#" className="inline-flex items-center justify-center p-4 text-blue-600 border-b-2 border-blue-600 rounded-t-lg active dark:text-blue-500 dark:border-blue-500 group">
                                <svg className="w-4 h-4 me-2 text-blue-600 group-hover:text-gray-500 dark:text-gray-500 dark:group-hover:text-gray-300" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                                    <path d="M10 0a10 10 0 1 0 10 10A10.011 10.011 0 0 0 10 0Zm0 5a3 3 0 1 1 0 6 3 3 0 0 1 0-6Zm0 13a8.949 8.949 0 0 1-4.951-1.488A3.987 3.987 0 0 1 9 13h2a3.987 3.987 0 0 1 3.951 3.512A8.949 8.949 0 0 1 10 18Z" />
                                </svg>Account Information
                            </a>
                        </li>
                    </ul>
                    <div id="personalInformation" className="persionalInformation py-1 px-1">
                        <form className="space-y-4" action="#" method="POST" onSubmit={(e) => { e.preventDefault(); submitForm() }}>

                            <h2 className="items-center text-xl py-2 mb-3 text-blue-700 border-b-1 rounded-t-lg active dark:text-blue-500 font-bold">Account Information</h2>
                            <FormWidget formModel={bankDetailModel} formStructure={bankAccountDetail} onInputChange={handleInputChange} formErrors={errors} rows={4} />
                            {/* formUpdated(localForm) */}

                            <h2 className="items-center text-xl py-2 mb-3 text-blue-700 border-b-1 rounded-t-lg active dark:text-blue-500 font-bold ">Personal Information</h2>
                            <FormWidget formModel={personalDetailModel} formStructure={personalDetailStructure} onInputChange={(e) => {
                                const { name, value } = e.target;
                                setPersonalDetailModel((prev) => ({
                                    ...prev,
                                    [name]: value,
                                }));
                            }} formErrors={errors} rows={4} />

                            <h2 className="items-center text-xl py-2 mb-3 text-blue-700 border-b-1 rounded-t-lg active dark:text-blue-500  font-bold">Address Information</h2>


                            <h4 className="items-center py-2 mb-3 text-gray-700 border-b-0 rounded-t-lg active dark:text-blue-500 font-semibold">Permanent Address : </h4>
                            <FormWidget
                                formModel={permanentAddressModel}
                                formStructure={permanentAddressStructure}
                                onInputChange={(e) => {
                                    const { name, value } = e.target;
                                    setPermanentAddressModel((prev) => ({
                                        ...prev,
                                        [name]: value,
                                    }));
                                }}
                                formErrors={errors}
                                rows={4}
                            />

                            <h4 className="items-center py-2 mb-3 text-gray-700 border-b-0 rounded-t-lg active dark:text-blue-500 font-semibold">Residential Address : </h4>
                            <FormWidget
                                formModel={residentialAddressModel}
                                formStructure={residentialAddressStructure}
                                onInputChange={(e) => {
                                    const { name, value } = e.target;
                                    setResidentialAddressModel((prev) => ({
                                        ...prev,
                                        [name]: value,
                                    }));
                                }}
                                formErrors={errors}
                                rows={4}
                            />

                            <h4 className="items-start py-4 mb-0 text-gray-700 border-b-0 rounded-t-lg active dark:text-blue-500 font-semibold">Correspoending Address : </h4>
                            <FormWidget
                                formModel={correspondingAddressModel}
                                formStructure={correspondingAddressStructure}
                                onInputChange={(e) => {
                                    const { name, value } = e.target;
                                    setCorrespondingAddressModel((prev) => ({
                                        ...prev,
                                        [name]: value,
                                    }));
                                }}
                                formErrors={errors}
                                rows={4}
                            />

                            <h2 className="items-center text-xl py-2 mb-3 text-blue-700 border-b-1 rounded-t-lg active dark:text-blue-500 font-bold">Contact Information</h2>
                            <FormWidget
                                formModel={communicationModel}
                                formStructure={commuincationStructure}
                                onInputChange={(e) => {
                                    const { name, value } = e.target;
                                    setCommunicationModel((prev) => ({
                                        ...prev,
                                        [name]: value,
                                    }));
                                }}
                                formErrors={errors}
                                rows={4}
                            />


                            <h2 className="items-center text-xl py-2 mb-3 text-blue-700 border-b-1 rounded-t-lg active dark:text-blue-500 font-bold">KYC Information</h2>
                            <FormWidget
                                formModel={kycModel}
                                formStructure={kycStructure}
                                onInputChange={(e) => {
                                    const { name, value } = e.target;
                                    setKycModel((prev) => ({
                                        ...prev,
                                        [name]: value,
                                    }));
                                }}
                                formErrors={errors}
                                rows={4}
                            />
                            <h2 className="text-xl py-2 mb-3 text-blue-700 border-b-1 rounded-t-lg active dark:text-blue-500 font-bold">Add On Information</h2>

                            <FormWidget
                                formModel={addOnDetailModel}
                                formStructure={addOnFormStructure}
                                onInputChange={(e) => {
                                    const { name, value } = e.target;
                                    setAddOnDetailState((prev) => ({
                                        ...prev,
                                        [name]: value,
                                    }));
                                }}
                                formErrors={errors}
                                rows={4}
                            />

                            <div className="flex items-center py-4 md:p-5 border-t border-gray-200 rounded-b dark:border-gray-600">
                                <button data-modal-hide="default-modal" type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Save</button>
                                <button data-modal-hide="default-modal" type="button" className="py-2.5 px-5 ms-3 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700">Cancel</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
};
export default AddUpdateBankAccount;
