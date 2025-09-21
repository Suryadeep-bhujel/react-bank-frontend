
import React, { useEffect, useState } from "react";

type Props = {
    isDialogOpen: boolean;
    onClose: () => void;
    onSave: ({ }) => void;
    dialogType?: string;
    dialogTitle?: string;
    formStructure?: any;
    formInputs?: any;
    formErrors?: any;
};
const DialogModal: React.FC<Props> = ({
    isDialogOpen,
    onClose,
    onSave,
    dialogType,
    dialogTitle,
    formStructure,
    formInputs,
    formErrors
}) => {
    console.log("isDialogOpenisDialogOpenisDialogOpen--->", isDialogOpen)
    const [localForm, setLocalForm] = useState<Record<string, any>>({});
    useEffect(() => {
        // create a shallow clone so edits in modal don't mutate parent's object
        setLocalForm(formInputs ? { ...formInputs } : {});
    }, [formInputs]);
    const submitFormData = () => {
        console.log("formInputs--->", localForm)
        onSave(localForm);
    }
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setLocalForm(prev => ({ ...prev, [name]: value }));
    };
    return (
        <>
            {isDialogOpen && (
                <div id="default-modal" aria-hidden="true" className=" overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full">
                    <div className="relative p-0 w-full max-w-3xl max-h-full">
                        <div className="relative bg-white rounded-lg shadow-sm dark:bg-gray-700">

                            <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600 border-gray-200">
                                <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                                    {dialogTitle}
                                </h3>
                                <button type="button" onClick={onClose} className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-hide="default-modal">
                                    <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                                    </svg>
                                    <span className="sr-only">Close modal</span>
                                </button>
                            </div>

                            <div className="p-4 md:p-5 space-y-4">
                                {formErrors && Object.keys(formErrors).length > 0 && (
                                    <div className="mb-4">
                                        <ul className="list-disc list-inside text-sm text-red-600">
                                            {Object.entries(formErrors).map(([field, errorMsg]) => (
                                                <li key={field}>{errorMsg}</li>
                                            ))}
                                        </ul>
                                    </div>
                                )}
                                <form className="space-y-4" action="#" method="POST" onSubmit={(e) => { e.preventDefault(); submitFormData() }}>
                                    {formStructure.map((field) => (
                                        <div key={field.fieldName}>
                                            <label htmlFor={field.fieldName} className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">{field.label}</label>
                                            <input type={field.dataType} name={field.fieldName} onChange={handleInputChange} id={field.fieldName} value={localForm[field.fieldName] ?? ""} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" placeholder={`Enter your ${field.label.toLowerCase()}`} />
                                        </div>
                                    ))}
                                    <div className="flex items-center p-4 md:p-5 border-t border-gray-200 rounded-b dark:border-gray-600">
                                        <button data-modal-hide="default-modal" type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Save</button>
                                        <button data-modal-hide="default-modal" type="button" className="py-2.5 px-5 ms-3 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700" onClick={onClose}>Cancel</button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    )
}
export default DialogModal;