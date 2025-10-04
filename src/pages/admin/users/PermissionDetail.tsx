import React from "react";
import { Link } from "react-router-dom";
import { PermissionOfRole } from "@states/RolePermissionState"
import { PermissionState } from "@states/PermissionState";
const PermissionDetail: React.FC = () => {
    const { 
        roleDetail, 
        updateSelectedPermission, 
        checkIfSelected, 
        selectAllItems, 
        selectGroupItems, 
        savePermissions, 
        selectedPermissions,
        updateRoleDetail 
    } = PermissionOfRole()



    const { 
        permissionGroupedList , 
        permissionCount

     } = PermissionState()

    return (
        <>
            <div className="">
                <div className="text-lg font-semibold text-gray-700 mb-4 flex justify-between">
                    <h1 className="text-2xl font-bold text-cyan-900 mb-4">
                        Update Permission Of Role
                    </h1>
                    <div className="text-gray-500 justify-end">
                        <Link
                            to="/roles"
                            className="bg-sky-600 text-white px-4 py-2 rounded hover:ring-gray-500"
                        >
                            Role List
                        </Link>
                    </div>
                </div>
                {/* content Area */}
                <label htmlFor="RoleName">
                    <span className="text-gray-700 font-semibold">Role Name:</span>
                    <input
                        type="text"
                        id="RoleName"
                        value={roleDetail?.name}
                        onChange={(e) =>
                            updateRoleDetail(() => ({name: e.target.value }))
                        }
                        className="form-input mt-2 mb-2 block w-full border-2 border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    />
                    
                </label>
                <label className="items-center space-x-2 mb-2 block cursor-pointer">
                    <input type="checkbox" onClick={(e) => {
                        selectAllItems(e.target?.checked ? permissionGroupedList : new Map())
                    }} checked={permissionCount === selectedPermissions.size} className="form-checkbox h-5 w-5 text-blue-600 rounded cursor-pointer" />
                    <span className="text-gray-700">Select All Permission</span>
                </label>
                <div className="flex flex-wrap">
                    {permissionGroupedList && permissionGroupedList.size > 0 && (
                        Array.from(permissionGroupedList.entries()).map(([group, permissions]) => (
                            <div key={group} className=" p-8">
                                <h3 className="font-semibold text-lg mb-2 capitalize">
                                    <label key={group} className="items-center space-x-2 mb-2 block cursor-pointer">
                                        <input onClick={(e) => {
                                            selectGroupItems(e.target.checked, group)
                                        }} type="checkbox" className="form-checkbox h-5 w-5 text-blue-600 rounded cursor-pointer" />
                                        <span className="text-gray-700"> {group}</span>
                                    </label>
                                </h3>
                                <div>
                                    {permissions.map((permission) => (
                                        <label key={permission.id} className="items-center space-x-2 mb-2 block cursor-pointer">
                                            <input type="checkbox"
                                                checked={checkIfSelected(permission.name)}
                                                onChange={() => updateSelectedPermission(permission.name)}
                                                className="form-checkbox h-5 w-5 text-blue-600 rounded cursor-pointer" />
                                            <span className="text-gray-700">{permission.name}</span>
                                        </label>
                                    ))}
                                </div>
                            </div>
                        ))
                    )}
                </div>
                <button onClick={(e) => savePermissions()} className="block text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-10 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 cursor-pointer" type="button">
                    Save
                </button>
            </div>
        </>
    )
}
export default PermissionDetail;