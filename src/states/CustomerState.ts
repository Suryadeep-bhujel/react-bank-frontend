import { useEffect, useState } from "react"
import { CustomerService } from "@openapi/CustomerService";
export interface Search {
    fieldName?: string;
    fieldValue?: string;
    page?: number;
    limit?: number;
    sortBy?: string;
    sortOrder?: string;
    totalPages?: number;
    total?: number;
    currentPage?: number;
    startFrom?: number;
}
export const CustomerState = () => {
    const [customerList, setCusomterList] = useState<any[]>([])
    const [isLoading, setIsLoading] = useState<Boolean>(true)

    const [search, setSearchParams] = useState<Search>({
        fieldName: '',
        fieldValue: '',
        limit: 20,
        page: 1,
        totalPages: 0,
        total: 0,
        currentPage: 1,
        startFrom: 1
    });
    useEffect(() => {
        getCustomersList();
    }, [search.currentPage, search.limit]);
    const getCustomersList = async () => {
        const { data: response } = await CustomerService.findAll(search)
        setCusomterList(response?.data);
        let startFrom = response.currentPage > 1 ? (response.currentPage - 1) * (search.limit || 100) : 1;
        setSearchParams(prev => ({
            ...prev,
            totalPages: response.totalPages,
            total: response.total,
            // currentPage: response.currentPage,
            startFrom,
            // limit: response?.limit
        }))
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
            // await getCustomersList();
        }
    }
   const handlePageSizeChange = async(pageSize:number) => {
    console.log("pageSize in state", pageSize)
    setSearchParams(prev => ({
        ...prev,
        limit: pageSize,
    }));
   }
    return {
        getCustomersList,
        handlePageChange,
        handlePageSizeChange,
        customerList,
        search,
        isLoading
    }
}