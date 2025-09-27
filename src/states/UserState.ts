import { useEffect, useState } from "react";
import { UsersManagementService } from "@src/openapi-request";
import type { SearchInterface, TableColumnStructure } from "@src/shared/SharedInterface";
import { searchResetData } from "@src/shared/SharedResetData";
import { useLoading } from "@context/LoadingContext";
export class DashboardStore {
    // const [users, setUsers] = useState<any[]>([]);
    // const [limit, setLimit] = useState<number>(100);
}
export interface Search {
    fieldName?: string,
    fieldValue?: string,
    page?: number,
    limit?: number,
    sortBy?: string,
    sortOrder?: string,
}
export const useUserState = () => {
    const [users, setUsers] = useState<any[]>([]);
    const { setIsLoading, isLoading } = useLoading();
    // const [currentUser, setCurrentUser] = useState<User | null>(null);
    const [limit, setLimit] = useState<number>(100);
    const [totalPages, setTotalPages] = useState<number>(0)
    const [total, setTotal] = useState<number>(0)
    const [currentPage, setCurrentPage] = useState<number>(0)
    const [startFrom, setTstartFrom] = useState<number>(0)
    const [search, setSearchParams] = useState<SearchInterface>(searchResetData);

    const tableColumns: TableColumnStructure[] = [
        { label: "ID", fieldName: "id", dataType: "number", visible: true },
        { label: "Full Name", fieldName: "name", dataType: "text", visible: true },
        { label: "Email", fieldName: "email", dataType: "email", visible: true },
        { label: "Phone No.", fieldName: "phone", dataType: "text", visible: true },
        { label: "Username", fieldName: "username", dataType: "text", visible: true },
        { label: "Role", fieldName: "role", dataType: "text" },
    ]
    useEffect(() => {
        getUsersList();
    }, [search.currentPage, search.limit, search.fieldValue]);
    useEffect(() => {
        setSearchParams(searchResetData);
    }, []);
    const getUsersList = async () => {
        // setSearchParams({
        //     limit: 100,
        //     fieldName: '',
        //     fieldValue: '',
        //     page: 1
        //     // sortBy: ,
        //     // sortOrder,
        // })
        // console.log("searchsearch", search)
        const { data: response } = await UsersManagementService.findAll(search);
        // console.log("response----->", response.data)
        setTotalPages(response.totalPages)
        setTotal(response.total)
        setCurrentPage(response.currentPage)
        let startFrom = response.currentPage > 1 ? (response.currentPage - 1) * (search.limit || 100) : 1;
        setTstartFrom(startFrom)

        setUsers(response.data);
        setLimit(response?.limit);
        // return users;
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
    const actionItems: any[] = [

    ]
    return {
        users,
        limit,
        search,
        totalPages,
        total,
        currentPage,
        startFrom,
        tableColumns,
        actionItems,
        isLoading,
        handlePageChange,
        handlePageSizeChange,
        handleSearch
    }
}
