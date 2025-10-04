import { useLoading } from "@src/context/LoadingContext";
import { ApiError, RoleService } from "@src/openapi-request";
import type { ColumnTypeInterface, SearchInterface, TableColumnStructure } from "@src/shared/SharedInterface";
import { searchResetData } from "@src/shared/SharedResetData";
import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom";
// import { PermissionState } from "./PermissionState";
import { toast } from "react-toastify";
export const RoleState = () => {
    const navigate = useNavigate()
    const [records, setListItems] = useState<any[]>([])
    const [isLoading, updateIsLoading] = useState<Boolean>(true)
    const { setIsLoading } = useLoading();
    const tableColumns: TableColumnStructure[] = [
        {
            name: "ID",
            fieldName: "id",
            dataType: "number",
        },
        {
            name: "Role Name",
            fieldName: "name",
            dataType: "text",
        },
        {
            name: "Permission Count",
            fieldName: "permissionCount",
            dataType: "number",
        },
        {
            name: "Created At",
            fieldName: "createdAt",
            dataType: "date",
        },
        {
            name: "Updated At",
            fieldName: "updatedAt",
            dataType: "date",
        },
        {
            name: "Actions",
            fieldName: "action",
            dataType: "action",
            actions: [
                {
                    buttonName: "Edit",
                    // dataType: "edit",
                    action: (recordItem: any) => {
                        navigate('/roles/edit-role/' + recordItem._oid);
                    }
                },
                {
                    buttonName: "Permissions",
                    // buttonType: "permission",
                    action: (recordItem: any) => {
                        navigate('/role/permissions/' + recordItem._oid);
                    }
                }
            ]
        }
        // {
        //     name: "Status", 
        //     fieldName : "status", 
        //     dataType: "text",
        // },
        // {
        //     name: "Action", 
        //     fieldName : "status", 
        //     dataType: "action",
        // }
    ]

    const [search, setSearchParams] = useState<SearchInterface>(searchResetData);
    useEffect(() => {
        fetchListItems();
    }, [search.currentPage, search.limit]);
    const fetchListItems = async () => {
        setIsLoading(true)
        const { data: response } = await RoleService.findAll(search)
        setListItems(response?.data);
        let startFrom = response.currentPage > 1 ? (response.currentPage - 1) * (search.limit || 100) : 1;
        setSearchParams(prev => ({
            ...prev,
            totalPages: response.totalPages,
            total: response.total,
            startFrom,
        }))
        setIsLoading(false)
        updateIsLoading(false);
    }
    const handlePageChange = async (pageNo: number) => {
        console.log("search ---->", pageNo)
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
        console.log("pageSize in state", pageSize)
        setSearchParams(prev => ({
            ...prev,
            limit: pageSize,
        }));
    }
    const openPermissionPage = async (roldOid: string) => {
        navigate('/role/permissions/' + roldOid);
    }
    return {
        fetchListItems,
        handlePageChange,
        handlePageSizeChange,
        openPermissionPage,
        records,
        search,
        isLoading,
        tableColumns
    }
}

export const PermissionOfRole = () => {
    const { setIsLoading } = useLoading();
    // const {records } = PermissionState()
    const [rolesPermissions, setPermissions] = useState<any[]>([])
    const [selectedPermissions, setSelectedPermission] = useState<Set<string>>(new Set());
    // const [rolesPermissions, setPermissions] = useState<Map<string, object[]>>(new Map())
    const [roleDetail, setRoleDetail] = useState<any>(null)
    const navigate = useNavigate()
    const { _oid: oid } = useParams();
    const getRoleDetail = async (roldOid: string) => {
        try {
            console.log("roldOidroldOid", roldOid)
            setIsLoading(true)
            const { data: roleItemReponse } = oid ? await RoleService.findOne({ oid: oid }) : { data: { permissions: null, role: null } };
            if (!roleItemReponse || !roleItemReponse.role) {
                toast.warning("Role not found");
                navigate("/roles")
            }
            // console.log("records", records)
            // const permissionMap: Map<string, object[]> = new Map();

            // roleDetail.permissions?.forEach((item: any) => {
            //     const groupKey = item.group;

            //     if (!permissionMap.has(groupKey)) {
            //         permissionMap.set(groupKey, []);
            //     }

            //     permissionMap.get(groupKey)?.push(item);
            // });
            // console.log("permissionMappermissionMap", permissionMap)

            setPermissions(roleItemReponse.permissions || [])
            setRoleDetail(roleItemReponse.role)
            const permissions: Set<string> = new Set();
            roleItemReponse.permissions?.map(item => permissions.add(item.name))
            setSelectedPermission(permissions)
            console.log("roleDetail", roleDetail)

        } catch (error) {
            if (error instanceof ApiError) {
                navigate("/roles")
                console.log("error", error)
            }
        }
        setIsLoading(false)
    }
    useEffect(() => {
        getRoleDetail(oid as string);
    }, []);

    const updateSelectedPermission = (name: string) => {
        setSelectedPermission(prev => {
            const newSet = new Set(prev);
            if (newSet.has(name)) {
                newSet.delete(name);
            } else {
                newSet.add(name);
            }
            return newSet;
        });
    };
    const selectGroupItems = (isSelected: boolean, group: string) => {
        const updatedPermissions = new Set(selectedPermissions);
        rolesPermissions.forEach(permission => {
            if (permission.group === group) {
                if (isSelected) {
                    updatedPermissions.add(permission.name);
                } else {
                    updatedPermissions.delete(permission.name);
                }
            }
        });
        setSelectedPermission(updatedPermissions);
    };
    const selectAllItems = (allPermissionsMap: Map<string, any[]> = new Map()) => {
        const permissions: Set<string> = new Set();

        for (const [, permissionsArray] of allPermissionsMap.entries()) {
            permissionsArray.forEach((permission: any) => {
                permissions.add(permission.name);
            });
        }

        setSelectedPermission(permissions);
    };


    const checkIfSelected = (permission: string): boolean => {
        return selectedPermissions.has(permission);
    }
    const savePermissions = async () => {
        // console.log("roleDetailroleDetail", roleDetail)
        setIsLoading(true)
        try {
            let message = ''
            if (roleDetail?._oid) {
                const response = await RoleService.updatePermissionOfRole({ oid: roleDetail._oid, requestBody: { permissionNames: Array.from(selectedPermissions) } })
                message = response?.message
            } else {
                console.log("roleDetailroleDetailroleDetail", roleDetail)
                const response = await RoleService.create({ requestBody: { name: roleDetail?.name, permissionNames: Array.from(selectedPermissions) } })
                message = typeof response === 'object' ? response?.message : 'Role added successfully.'
            }
            toast.success(message);
        } catch (error) {
            toast.error(error?.message);
            console.log("error is ", error?.message)
        }
        setIsLoading(false)
    }
    const updateRoleDetail = (detail: Partial<T>) => {
        setRoleDetail((prev) => ({ ...prev, ...detail }))
    }
    return {
        getRoleDetail,
        rolesPermissions,
        roleDetail,
        updateSelectedPermission,
        selectedPermissions,
        checkIfSelected,
        selectGroupItems,
        selectAllItems,
        savePermissions,
        updateRoleDetail

    }
}