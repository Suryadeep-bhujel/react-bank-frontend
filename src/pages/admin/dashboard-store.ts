import { useEffect, useState } from "react";
import { AuthService, UsersManagementService } from "../../openapi-request"
import type { User } from "./Users";
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
export const DashboardService = () => {
    const [users, setUsers] = useState<any[]>([]);
    const [currentUser, setCurrentUser] = useState<User | null>(null);
    const [limit, setLimit] = useState<number>(100);
    const [totalPages, setTotalPages] = useState<number>(0)
    const [total, setTotal] = useState<number>(0)
    const [currentPage, setCurrentPage] = useState<number>(0)
    const [startFrom, setTstartFrom] = useState<number>(0)

    const [search, setSearchParams] = useState<Search>({
        fieldName: '',
        fieldValue: '',
        limit: 10,
        page: 1,
    });
    // useEffect(async() => {
    //     setSearchParams({
    //         limit: 
    //     })
    // })
    // useEffect(() => {
    //     const loadUserData = async () => {
    //         const response = await UsersManagementService.usersControllerFindAll({});
    //         console.log("response----->", response)

    //         setUsers(response?.data);
    //         setLimit(response?.limit);
    //     }
    //     loadUserData()
    // }, [users])
    useEffect(() => {
        setSearchParams({
            limit: 10,
            fieldName: '',
            fieldValue: '',
            page: 1,
            // sortBy: ,
            // sortOrder,
        });
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
    return {
        getUsersList,
        users,
        limit,
        search,
        totalPages,
        total,
        currentPage,
        startFrom
    }
}
