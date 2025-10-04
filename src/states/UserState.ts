import { use, useEffect, useState } from "react";
import { RoleService, UsersManagementService } from "@src/openapi-request";
import type { FormStructure, SearchInterface, TableColumnStructure } from "@src/shared/SharedInterface";
import { searchResetData } from "@src/shared/SharedResetData";
import { useLoading } from "@context/LoadingContext";
import type { User } from "@src/pages/admin/Users";
import { useDialogueState } from "@src/states/useDialogueState";
export class DashboardStore {
    // const [users, setUsers] = useState<any[]>([]);
    // const [limit, setLimit] = useState<number>(100);
}
export const useUserState = () => {
    const [users, setUsers] = useState<any[]>([]);
    const { setIsLoading, isLoading } = useLoading();
    const { isDialogOpen, setIsDialogOpen } = useDialogueState();
    // const [currentUser, setCurrentUser] = useState<User | null>(null);
    const [limit, setLimit] = useState<number>(100);
    const [totalPages, setTotalPages] = useState<number>(0)
    const [total, setTotal] = useState<number>(0)
    const [currentPage, setCurrentPage] = useState<number>(0)
    const [startFrom, setTstartFrom] = useState<number>(0)
    const [search, setSearchParams] = useState<SearchInterface>(searchResetData);
    const [userRoles, setUserRoles] = useState<string[]>([]);
    const [roleDialogType, setRoleDialogType] = useState<string>("Update User Role's");
    const [roleFormTitle, setRoleFormTitle] = useState<string>("Update User Role's");
    const [roleErrors, setRoleFormErrors] = useState<string[]>([])
    const [roleFormModel, setRoleFormModal] = useState<Record<string, any>>({
        roles: [],
        user: null
    });
    const [roleList, setRoleList] = useState<any[]>([]);

    const tableColumns: TableColumnStructure[] = [
        { label: "ID", fieldName: "id", dataType: "number", visible: true },
        { label: "Full Name", fieldName: "name", dataType: "text", visible: true },
        { label: "Email", fieldName: "email", dataType: "email", visible: true },
        { label: "Phone No.", fieldName: "phone", dataType: "text", visible: true },
        { label: "Username", fieldName: "username", dataType: "text", visible: true },
        { label: "Role", fieldName: "role", dataType: "text" },
        {
            label: "Actions", fieldName: "actions", dataType: "action", visible: false, actions: [
                {
                    buttonName: "Edit",
                    action: () => {
                        alert("Edit action clicked")
                    },
                    icon: "<svg xmlns='http://www.w3.org/2000/svg' class='h-5 w-5' viewBox='0 0 20 20' fill='currentColor'><path d='M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z'/></svg>"
                },
                {
                    buttonName: "Update Role",
                    action: (user) => {
                        openUpdateRoleDialog(user)
                    },
                    icon: "<svg xmlns='http://www.w3.org/2000/svg' class='h-5 w-5' viewBox='0 0 20 20' fill='currentColor'><path d='M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z'/></svg>"
                },
                {
                    buttonName: "Password",
                    action: () => {
                        alert("New Password action clicked")
                    },
                    icon: "<svg xmlns='http://www.w3.org/2000/svg' class='h-5 w-5' viewBox='0 0 20 20' fill='currentColor'><path d='M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z'/></svg>"
                }
            ]
        },

    ]
    useEffect(() => {
        getUsersList();
    }, [search.currentPage, search.limit, search.fieldValue]);
    useEffect(() => {
        setSearchParams(searchResetData);
    }, []);
    useEffect(() => {
        getAllRoles()
    }, []);
    const getUsersList = async () => {
        const { data: response } = await UsersManagementService.findAll(search);
        setTotalPages(response.totalPages)
        setTotal(response.total)
        setCurrentPage(response.currentPage)
        let startFrom = response.currentPage > 1 ? (response.currentPage - 1) * (search.limit || 100) : 1;
        setTstartFrom(startFrom)
        setUsers(response.data);
        setLimit(response?.limit);
    }
    const getAllRoles = async () => {
        const { data: response } = await RoleService.roleDropdown(search);
        setRoleList(response.data?.map(role => {
            return { label: role.name, value: role.name }
        }));
    }
    const handlePageChange = async (pageNo: number) => {
        if (pageNo !== search.currentPage) {
            console.log("search condition inside", pageNo)
            setSearchParams(prev => ({
                ...prev,
                page: pageNo,
                currentPage: pageNo
            }));
        }
    }
    const handlePageSizeChange = async (pageSize: number) => {
        setSearchParams(prev => ({
            ...prev,
            limit: pageSize,
        }));
    }
    const handleSearch = (fieldName: string, fieldValue: string) => {
        console.log("Searching for", fieldName, fieldValue);
        setSearchParams(prev => ({
            ...prev,
            fieldName,
            fieldValue,
            page: 1,
            currentPage: 1
        }));
    }
    const roleFormStructure: FormStructure[] = [
        {
            fieldName: "name",
            label: "User",
            dataType: "text",
            placeholder: "User",
            visible: true,
            disabled: true,
        },
        {
            fieldName: "roles",
            label: "Assign Role's",
            dataType: "options",
            multiSelect: true,
            placeholder: "Select Role's",
            options: roleList,
            visible: true,
        }
    ]
    const openUpdateRoleDialog = async (user: User) => {
        const { data: { roles, user: userInfo } } = await UsersManagementService.getUserRoles({ userOid: user._oid as string });
        if (userInfo) {
            setUserRoles(roles)
            setIsDialogOpen(true)
            setRoleFormModal({
                ...user,
                roles: roles,
            })
        }

        console.log("userWithRole", roles);
    }
    const handleRoleFormSubmit = async (formBody: any) => {
        // console.log("jsdlfjsdflsdfjjsfl", formBody)
        try {
            setIsLoading(true)
            const response = await UsersManagementService.assignUserRole({ userOid: formBody._oid, requestBody: { roles: formBody.roles } })
            if(!response.success){
                setRoleFormErrors(response?.body?.message || response?.message || {});
            }
            else {
                setRoleFormErrors([])
            }
            setUserRoles([])
            setIsDialogOpen(false)
            console.log("sdjfkljfs", response)
            setIsLoading(false)
        } catch (error) {
            setRoleFormErrors(error?.body?.message || error?.message || {});
        }

    }
    return {
        users,
        limit,
        search,
        totalPages,
        total,
        currentPage,
        startFrom,
        tableColumns,
        isLoading,
        handlePageChange,
        handlePageSizeChange,
        handleSearch,
        userRoles,
        isDialogOpen,
        roleDialogType,
        roleFormTitle,
        roleFormStructure,
        roleFormModel,
        roleErrors,
        setIsDialogOpen,
        handleRoleFormSubmit,
    }
}
