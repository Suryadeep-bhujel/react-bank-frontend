import type { ListTableInterface, TableColumnStructure } from "@src/shared/SharedInterface";
import React, { useRef, useState } from "react";
import Pagination from "@shared/Pagination";
import SearchWidget from "@src/pages/shared/SearchWidget";
import { fi } from "@faker-js/faker";
const ListTable: React.FC<ListTableInterface> = ({
    tableColumns,
    records,
    currentPage,
    totalPages,
    limit,
    actions,
    total,
    startFrom,
    paginationSpace = 'bottom',
    handlePageChange,
    handlePageSizeChange,
    handleSearch
}) => {
    const calculateToRecordCount = () => {

        const to = ((currentPage > 1 ? currentPage - 1 : 0) * limit) + records.length
        return to;
    }
    const calculateFromRecordCount = () => {

    }
    const [open, setOpen] = useState(false);
    const buttonRef = useRef(null);
    const menuRef = useRef(null);
    function onMenuKeyDown(e) {
        const itemsEls = Array.from(
            menuRef.current?.querySelectorAll('[role="menuitem"]') || []
        );
        const idx = itemsEls.indexOf(document.activeElement);


        if (e.key === "ArrowDown") {
            e.preventDefault();
            const next = itemsEls[(idx + 1) % itemsEls.length];
            next?.focus();
        } else if (e.key === "ArrowUp") {
            e.preventDefault();
            const prev = itemsEls[(idx - 1 + itemsEls.length) % itemsEls.length];
            prev?.focus();
        } else if (e.key === "Home") {
            e.preventDefault();
            itemsEls[0]?.focus();
        } else if (e.key === "End") {
            e.preventDefault();
            itemsEls[itemsEls.length - 1]?.focus();
        } else if (e.key === "Tab") {
            // trap focus by preventing tab when menu is open
            e.preventDefault();
        } else if (e.key === "Enter" || e.key === " ") {
            // handled by onClick of button, allow
        }
    }
    return (
        <>
            <SearchWidget
                fields={tableColumns}
                onSearch={(fieldName, fieldValue) => handleSearch(fieldName, fieldValue)}
            />
            {paginationSpace === 'top' &&
                <Pagination
                    totalPages={totalPages}
                    startFrom={startFrom || 0}
                    records={calculateToRecordCount()}
                    total={total || 0}
                    currentPage={currentPage}
                    pageChanged={handlePageChange}
                    pageSizeChanged={handlePageSizeChange}
                />
            }
            <table className="table-auto w-full border-collapse border border-green-600">
                <thead>
                    <tr className="bg-gray-200">
                        <th className="w-1/4 px-4 py-2 text-left whitespace-nowrap">S.N</th>
                        {(tableColumns && tableColumns.length) && tableColumns.map((tableColumnObj) => (
                            <th className="w-1/4 px-4 py-2 text-left whitespace-nowrap">{tableColumnObj.name || tableColumnObj.label}</th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {records.map((recordItem, index) => (
                        <tr className="border-b hover:bg-blue-200" key={recordItem.id}>
                            <>
                                <td className="px-4 py-2 whitespace-nowrap">{(currentPage > 1 ? (currentPage - 1) * (limit || 100) : 1) + index}</td>
                                {tableColumns.map((fieldItem: TableColumnStructure) => (
                                    <>
                                        <td className="px-4 py-2">
                                            {fieldItem.dataType !== "action" && (recordItem[fieldItem.fieldName])}
                                            {fieldItem?.dataType === 'action' && fieldItem?.actions && fieldItem?.actions.length && (
                                                <>
                                                    <div className="flex mx-1">
                                                        {fieldItem?.actions.length > 1 ? (
                                                            <>
                                                                {/*  add three dots expandable icon and on click show the list of actions menu below */}
                                                                {/* TODO - make this toggle proper */}
                                                                <button className="block text-blue-900 text-shadow-blue-400  hover:bg-blue-300 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-0.5 py-1 mx-0.5 text-center  dark:hover:bg-blue-700 dark:focus:ring-blue-800 cursor-pointer" onClick={() => setOpen((v) => !v)}
                                                                    aria-expanded={open} ref={buttonRef}>
                                                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="size-6">
                                                                        <path stroke-linecap="round" stroke-linejoin="round" d="M12 6.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5ZM12 12.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5ZM12 18.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5Z" />
                                                                    </svg>

                                                                </button>
                                                                <div
                                                                    ref={menuRef}
                                                                    role="menu"
                                                                    aria-orientation="vertical"
                                                                    className={`absolute right-0 mt-2 w-44 origin-top-right rounded-xl border border-slate-200 bg-white shadow-lg ring-1 ring-black/5 focus:outline-none transition-all duration-150 ease-out ${open ? "opacity-100 scale-100 translate-y-0" : "pointer-events-none opacity-0 scale-95 -translate-y-1"
                                                                        }`}

                                                                >
                                                                    <ul className="py-1">
                                                                        {fieldItem?.actions.length === 0 ? (
                                                                            <li className="px-3 py-2 text-sm text-slate-500 select-none">No actions</li>
                                                                        ) : (
                                                                            fieldItem?.actions.map((it, i) => (
                                                                                <li key={i}>
                                                                                    <button
                                                                                        role="menuitem"

                                                                                        className={`w-full text-left px-3 py-2 text-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-400 rounded-lg transition-colors duration-100 hover:bg-slate-100
                                                                                            }`}
                                                                                    >
                                                                                        {/* {it.icon && <span className="mr-2 inline-flex">{it.icon}</span>} */}
                                                                                        {it.buttonName}
                                                                                    </button>
                                                                                </li>
                                                                            ))
                                                                        )}
                                                                    </ul>
                                                                </div>
                                                            </>
                                                        ) : (
                                                            <>
                                                                {fieldItem?.actions.map(actionItem => (
                                                                    <button onClick={(e) => { e.preventDefault(); actionItem.action(recordItem) }} type="button" className="block text-white bg-sky-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-6 py-2 mx-0.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 cursor-pointer">
                                                                        {actionItem.buttonName}
                                                                    </button>
                                                                ))}
                                                            </>)}

                                                    </div>
                                                </>
                                            )}
                                        </td>
                                    </>
                                ))}
                            </>
                        </tr>
                    ))}
                </tbody>
            </table>
            {paginationSpace === 'bottom' &&
                <Pagination
                    totalPages={totalPages}
                    startFrom={startFrom || 0}
                    records={calculateToRecordCount()}
                    total={total || 0}
                    currentPage={currentPage}
                    pageChanged={handlePageChange}
                    pageSizeChanged={handlePageSizeChange}
                />
            }
        </>
    )
}
export default ListTable;