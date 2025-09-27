import type { FormStructure } from "@src/shared/SharedInterface";
import { useEffect, useState } from "react";
import Select from 'react-select'
import { DateAndTimeService } from "../../../@bank-app-common/service/date-service";

type Props = {
    // onClose?: () => void;
    // onSave: ({ }) => void;
    onInputChange: ({ }) => void;
    dialogTitle?: string;
    formStructure: FormStructure[];
    // formInputs?: any;
    formErrors?: any;
    rows?: number,
    formModel: any,
};
const FormWidget: React.FC<Props> = ({
    onInputChange,
    formStructure,
    // formInputs,
    formModel,
    formErrors,
    rows = 4
}) => {
    return (
        <>
            {/* {`grid-cols-${rows}`} */}
            <div>
                {/* {JSON.stringify(formStructure)} */}
                {/* <form className="space-y-4" action="#" method="POST" onSubmit={(e) => { e.preventDefault() }}> */}
                {formErrors && (
                    <>
                        {Array.isArray(formErrors) && Object.keys(formErrors).length > 0 && (
                            <div className="mb-4">
                                <ul className="list-disc list-inside text-sm text-red-600">
                                    {Object.entries(formErrors).map(([field, errorMsg]) => (
                                        <li key={field} className="mb-1 text-sm text-red-700 bg-red-50 border border-red-100 rounded px-2 py-1" role="alert">
                                            {errorMsg}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )}
                        {!Array.isArray(formErrors) && typeof formErrors === 'string' && (
                            <ul className="list-disc list-inside text-sm text-red-600">
                                <li>{formErrors}</li>
                            </ul>
                        )}
                    </>
                )}
                <div className="grid">
                    {formStructure && formStructure.filter(formItem => formItem.visible && formItem.single).map((field) => (
                        <div key={field.fieldName} >
                            <label htmlFor={field.fieldName} className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">{field.label}</label>
                            {field.dataType === 'options' && (
                                <>
                                    <Select
                                        options={field?.options}
                                        onChange={(selectedOption) => onInputChange({ target: { name: field.fieldName, value: selectedOption?.value } })}
                                        name={field.fieldName}
                                        value={field?.options?.find(option => option.value === formModel?.[field.fieldName]) ?? ""}
                                        onKeyDown={(e) => {
                                            const nextValue =
                                                e.key.length === 1 // if it's a normal character
                                                    ? e.target.value + e.key
                                                    : e.key === "Backspace"
                                                        ? e.target.value.slice(0, -1)
                                                        : e.target.value;

                                            field.searchItems ? field.searchItems(nextValue) : undefined;
                                        }}
                                    />
                                </>
                            )}
                            {field.dataType !== 'options' && (
                                <>
                                    <input key={field.fieldName} type={field.dataType} name={field.fieldName} onChange={(e) => {
                                        if (field.dataType === 'date') {
                                            // e.target.value === DateAndTimeService.convertDate(formModel?.[field.fieldName])
                                        }
                                        onInputChange(e)
                                    }} id={field.fieldName} value={formModel?.[field.fieldName] ?? ""} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" placeholder={field?.placeholder ? field?.placeholder : `Enter ${field.label}`} />
                                </>
                            )}
                        </div>
                    ))}
                </div>

                <div className={`grid grid-cols-${rows} gap-4`} style={{ gridTemplateColumns: `repeat(${rows}, minmax(0, 1fr))` }}>
                    {formStructure && formStructure.filter(formItem => formItem.visible && !formItem.single).map((field) => (
                        <div key={field.fieldName} >
                            <label htmlFor={field.fieldName} className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">{field.label}</label>
                            {field.dataType === 'options' && (
                                <>
                                    <Select
                                        options={field?.options}
                                        onChange={(selectedOption) => onInputChange({ target: { name: field.fieldName, value: selectedOption?.value } })}
                                        name={field.fieldName}
                                        value={field?.options?.find(option => option.value === formModel?.[field.fieldName]) ?? ""}
                                        onKeyDown={(e) => {
                                            const nextValue =
                                                e.key.length === 1 // if it's a normal character
                                                    ? e.target.value + e.key
                                                    : e.key === "Backspace"
                                                        ? e.target.value.slice(0, -1)
                                                        : e.target.value;

                                            field.searchItems ? field.searchItems(nextValue) : undefined;
                                        }}
                                    />
                                </>
                            )}
                            {field.dataType !== 'options' && (
                                <>
                                    <input key={field.fieldName} type={field.dataType} name={field.fieldName} onChange={(e) => {
                                        if (field.dataType === 'date') {
                                            // e.target.value === DateAndTimeService.convertDate(formModel?.[field.fieldName])
                                        }
                                        onInputChange(e)
                                    }} id={field.fieldName} value={formModel?.[field.fieldName] ?? ""} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" placeholder={field?.placeholder ? field?.placeholder : `Enter ${field.label}`} />
                                </>
                            )}
                        </div>
                    ))}

                </div>

                {/* </form> */}
            </div>
        </>
    );
};
export default FormWidget;