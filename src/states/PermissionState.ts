import { PermissionsService } from "@src/openapi-request";
import type { ColumnTypeInterface, SearchInterface } from "@src/shared/SharedInterface";
import { searchResetData } from "@src/shared/SharedResetData";
import { useEffect, useState } from "react"
export interface PermissionInterface {
    records: any[];
    setListItems: (value: any[]) => void;
}
export const PermissionState = () => {
    const [records, setListItems] = useState<any[]>([])
    const [permissionGroupedList, setGroupedList] = useState<Map<string, object[]>>(new Map())
    const [isLoading, setIsLoading] = useState<Boolean>(true)
    const [permissionCount, setPermissionCounts] = useState<Number>(0)
    const tableColumns: ColumnTypeInterface[] = [
        {
            name: "Id",
            fieldName: "id",
            dataType: "number",
        },
        {
            name: "Name",
            fieldName: "name",
            dataType: "text",
        },
        {
            name: "Permission Group",
            fieldName: "group",
            dataType: "text",
        },
        // {
        //     name: "Created Date",
        //     fieldName: "createdAt",
        //     dataType: "datetime",
        // },
        // {
        //     name: "Updated Date",
        //     fieldName: "updatedAt",
        //     dataType: "datetime",
        // }
    ]
    const [search, setSearchParams] = useState<SearchInterface>(searchResetData);
    useEffect(() => {
        fetchListItems();
    }, []);
    const fetchListItems = async () => {
        const { data: response } = await PermissionsService.findAll()
        setListItems(response);
        // let startFrom = response.currentPage > 1 ? (response.currentPage - 1) * (search.limit || 100) : 1;
        setSearchParams(prev => ({
            ...prev,
            totalPages: 1,
            total: response.length,
            startFrom: 1,
        }))
        setPermissionCounts(response.length)
        const permissionMap: Map<string, object[]> = new Map();
        response?.sort((a, b) => a?.group.localeCompare(b?.group))?.forEach((item: any) => {
            const groupKey = item.group;
            if (!permissionMap.has(groupKey)) {
                permissionMap.set(groupKey, []);
            }
            permissionMap.get(groupKey)?.push(item);
        });
        setGroupedList(permissionMap)
        setIsLoading(false)
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
    return {
        fetchListItems,
        handlePageChange,
        handlePageSizeChange,
        records,
        search,
        isLoading,
        tableColumns,
        permissionGroupedList,
        permissionCount
    }
}