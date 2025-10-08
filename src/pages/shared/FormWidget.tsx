import type { FormStructure } from "@src/shared/SharedInterface";
// import { useEffect, useState } from "react";
import Select from 'react-select'
// import { DateAndTimeService } from "@bank-app-common/service/date-service";

type Props = {
    // onClose?: () => void;
    // onSave: ({ }) => void;
    onInputChange: (params:any) => void;
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
    const handleSelectKeydown = (e: any, field: FormStructure) => {
        // onInputChange({ target: { name: fieldName, value: selectedOption?.value } })
        const nextValue =
            e?.key?.length === 1 // if it's a normal character
                ? e.target.value + e.key
                : e.key === "Backspace"
                    ? e.target.value.slice(0, -1)
                    : e.target.value;

        field.searchItems ? field.searchItems(nextValue) : undefined;
    }
    const handleSelectOnChange = (event:any, field: FormStructure) => {
        if (Array.isArray(event)) {
            console.log("eventeventeventevent", event)
            console.log("eventeventeventeventfield.fieldName", event)
            onInputChange({ target:  {name : field.fieldName, value: event.map(item => item.value) } })
        } else {
            onInputChange({ target: { name: event?.name, value: event?.value } })
        }
        // (selectedOption) => onInputChange({ target: { name: field.fieldName, value: selectedOption?.value } })
    }
    const setSelectedValue = (field: FormStructure) => {
        if (field.multiSelect) {
            console.log("formModel?.[field.fieldName]formModel?.[field.fieldName]formModel?.[field.fieldName]", formModel?.[field.fieldName])
            return formModel?.[field.fieldName]?.map((val: any) => {
                return field?.options?.find((option: any) => option.value === val);
            });
        } else {
            return field?.options?.find((option: any) => option.value === formModel?.[field.fieldName]);
        }
    }
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
                <div className={`grid ${rows > 1 ? `grid-cols-${rows} gap-4` : ""}`} style={rows > 1 ? { gridTemplateColumns: `repeat(${rows}, minmax(0, 1fr))` } : undefined}>
                    {formStructure && formStructure.filter(formItem => !formItem.single).map((field) => (
                        <div key={field.fieldName} >
                            <label htmlFor={field.fieldName} className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">{field.label}</label>
                            {field.dataType === 'options' && (
                                <>
                                    <Select
                                        className="basic-multi-select"
                                        isMulti={field.multiSelect}
                                        options={field?.options}
                                        onChange={(event) => handleSelectOnChange(event, field)}
                                        name={field.fieldName}
                                        value={setSelectedValue(field)}
                                        onKeyDown={(e) => handleSelectKeydown(e, field)}
                                    />
                                </>
                            )}
                            {field.dataType !== 'options' && (
                                <>
                                    <input disabled={field?.disabled} key={field.fieldName} type={field.dataType} name={field.fieldName} onChange={(e) => {
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