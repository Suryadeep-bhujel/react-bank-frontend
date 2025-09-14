import { useEffect, useState } from "react"
import { BranchManagementService } from "@openapi/BranchManagementService";
export interface Search {
    fieldName?: string,
    fieldValue?: string,
    page?: number,
    limit?: number,
    sortBy?: string,
    sortOrder?: string,
}
export const BranchState = () => {
    const [branchList, setBranchList] = useState<any[]>([])
    const [limit, setLimit] = useState<number>(20);
    const [totalPages, setTotalPages] = useState<number>(0)
    const [total, setTotal] = useState<number>(0)
    const [currentPage, setCurrentPage] = useState<number>(1)
    const [startFrom, setTstartFrom] = useState<number>(0)
    const [isLoading, setIsLoading] = useState<Boolean>(true)

    const [search, setSearchParams] = useState<Search>({
        fieldName: '',
        fieldValue: '',
        limit: limit,
        page: currentPage,
    });
    useEffect(() => {
        getBranchList();
    }, [search]);
    const getBranchList = async () => {
        const { data: response } = await BranchManagementService.findAll(search)
        setBranchList(response?.data);
        setTotalPages(response.totalPages)
        setTotal(response.total)
        setCurrentPage(response.currentPage)
        let startFrom = response.currentPage > 1 ? (response.currentPage - 1) * (search.limit || 100) : 1;
        setTstartFrom(startFrom)
        setLimit(response?.limit);
        setIsLoading(false)
    }
    const handlePageChange = async (pageNo: number) => {
        setCurrentPage(pageNo)
        setSearchParams(prev => ({
            ...prev,
            page: pageNo,
        }));
    }
    return {
        getBranchList,
        handlePageChange,
        branchList,
        limit,
        search,
        totalPages,
        total,
        currentPage,
        startFrom,
        isLoading
    }
}