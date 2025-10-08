import type { TableColumnStructure } from "@src/shared/SharedInterface";
import React from "react";


const SearchWidget: React.FC<{
    fields: TableColumnStructure[];
    onSearch: (fieldName: string, fieldValue: string) => void;
}> = ({ fields, onSearch }) => {
    const [selectedFieldOption, setSelectedField] = React.useState<TableColumnStructure | null>(null);
    const [searchValue, setSearchValue] = React.useState<string>("");
    const [isFieldSelected, setIsFieldSelected] = React.useState<boolean>(false);

    const handleFieldChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedFieldOption = fields.find(fieldItem => fieldItem.fieldName === e.target.value);
        if (selectedFieldOption && Object.keys(selectedFieldOption).length > 1) {
            setSelectedField(selectedFieldOption);
            setIsFieldSelected(true);
        }
    };

    const handleValueChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchValue(e.target.value);
    };

    const handleSearch = () => {
        if (selectedFieldOption && searchValue) {
            onSearch(selectedFieldOption.fieldName, searchValue);
        }
    };
    const resetSearch = () => {
        onSearch('', '');
    }

    return (
        <div className="grid grid-cols-2">
            <div className="flex space-x-2 mb-4">
                <select
                    value={selectedFieldOption ? selectedFieldOption.fieldName : ""}
                    onChange={handleFieldChange}
                    className="border border-gray-300 rounded px-2 py-1"
                >
                    <option>Select Field for search</option>
                    {fields.filter(field => field.visible).map((field, key) => (
                        <option key={`search${key}`} value={field.fieldName}>
                            {field.label}
                        </option>
                    ))}
                </select>
                {isFieldSelected && (
                    <>
                        {selectedFieldOption?.dataType === "options" && (
                            <select
                                value={searchValue}
                                onChange={(e: any) => handleValueChange(e)}
                                className="border border-gray-300 rounded px-2 py-1 flex-grow"
                            >
                                <option value="">Select {selectedFieldOption?.label}</option>
                                {selectedFieldOption?.options?.map((option) => (
                                    <option key={option.value} value={option.value}>
                                        {option.label}
                                    </option>
                                ))}
                            </select>
                        )}
                        {selectedFieldOption?.dataType !== "options" && (
                            <input
                                type={selectedFieldOption?.dataType || "text"}
                                value={searchValue}
                                onChange={handleValueChange}
                                placeholder={`Enter ${selectedFieldOption?.label} value`}
                                className="border border-gray-300 rounded px-2 py-1 flex-grow"
                            />
                        )}
                        <button
                            onClick={handleSearch}
                            className="bg-blue-500 text-white px-4 py-1 rounded hover:bg-blue-600"
                        >
                            Search
                        </button>
                        <button
                            onClick={resetSearch}
                            className="bg-red-500 text-white px-4 py-1 rounded hover:bg-blue-600"
                        >
                            Reset
                        </button>
                    </>
                )}
            </div>

        </div>
    );
};

export default SearchWidget;