import { useEffect, useState } from "react"
import { BranchManagementService } from "@openapi/BranchManagementService";
import type { TableColumnStructure } from "@src/shared/SharedInterface";
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
    const tableColumns: TableColumnStructure[] = [
        { label: "ID", fieldName: "id", dataType: "number", visible: true },
        { label: "Branch Name", fieldName: "branchName", dataType: "text", visible: true },
        { label: "Branch Code", fieldName: "branchCode", dataType: "text", visible: true },
        { label: "Branch Address", fieldName: "branchAddress", dataType: "text", visible: true },
        { label: "Branch Phone No.", fieldName: "branchPhoneNumber", dataType: "text", visible: true },
        { label: "Branch Email", fieldName: "branchEmail", dataType: "text", visible: true },
        { label: "Branch Type", fieldName: "branchType", dataType: "text", visible: true },
        { label: "Branch Status", fieldName: "branchStatus", dataType: "text", visible: true },
        { label: "Actions", fieldName: "actions", dataType: "action", visible: false, actions: [
            {
                buttonName: "Edit",
                icon: "sdf",
                color: "sdfsdf",
                action: (record:any )=> {
                    console.log("recordItem ", record)
                    alert(record._oid)
                }
            },
            {
                buttonName: "View",
                icon: "sdf",
                color: "sdfsdf",
                action: (record:any )=> {
                    console.log("recordItem ", record)
                    alert(record._oid)
                }
            }
        ] },
    ]
    const actionItems: any[] = [

    ]
    useEffect(() => {
        setIsLoading(true);
        getBranchList();
    }, [search.fieldValue, search.limit, search.page]);
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
    const handlePageChange = (pageNo: number) => {
        setCurrentPage(pageNo)
        setSearchParams(prev => ({
            ...prev,
            page: pageNo,
        }));
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
    return {
        getBranchList,
        handlePageChange,
        handlePageSizeChange,
        branchList,
        limit,
        search,
        totalPages,
        total,
        currentPage,
        startFrom,
        isLoading,
        tableColumns,
        actionItems,
        handleSearch
    }
}