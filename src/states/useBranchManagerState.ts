import { useLoading } from "@src/context/LoadingContext";
import { BranchManagerService } from "@src/openapi-request";
import type { SearchInterface, TableColumnStructure } from "@src/shared/SharedInterface";
import { searchResetData } from "@src/shared/SharedResetData";
import { useEffect, useState } from "react";

export const useBranchManagerState = () => {
    const { setIsLoading } = useLoading();
    const [branchManagers, setBranchManagers] = useState<any[]>([]);
    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState<Record<string, string>>({});
    const [search, setSearchParams] = useState<SearchInterface>(searchResetData);

    useEffect(() => {
        fetchBranchManagers();
    }, [search.currentPage, search.limit, search.fieldValue]);
    const fetchBranchManagers = async () => {
        setLoading(true);
        try {
            const { data: response } = await BranchManagerService.findAll(search);
            setBranchManagers(response.data as any[] || []);
            let startFrom = response.currentPage > 1 ? (response.currentPage - 1) * (search.limit || 100) : 1;
            setSearchParams(prev => ({
                ...prev,
                totalPages: response.totalPages,
                total: response.total,
                startFrom,
            }))
            setIsLoading(false)
        } catch (err) {
            setErrors(err as any);
        } finally {
            setLoading(false);
        }
    };
    const listTableStructure: TableColumnStructure[] = [
        { label: "Branch Name", fieldName: "branchName", dataType: "text", visible: true },
        { label: "Manager Fullname", fieldName: "fullName", dataType: "text", visible: true },
        { label: "Branch Phone", fieldName: "branchPhone", dataType: "email", visible: true },
        { label: "Manager Phone", fieldName: "phoneNumber", dataType: "text", visible: true },
        {
            label: "Actions", fieldName: "action", dataType: "action", visible: false, actions: [
                {
                    buttonName: "Edit",
                    action: (oid: string) => {
                        console.log("oid--->", oid)
                        // alert("Edit action clicked")
                    },
                    icon: "<svg xmlns='http://www.w3.org/2000/svg' class='h-5 w-5' viewBox='0 0 20 20' fill='currentColor'><path d='M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z'/></svg>",
                    color: "blue",
                    // onClick: (recordItem: any) => {
                    //     console.log("recordItem--->", recordItem)
                    //     // alert("Edit action clicked")
                    //     // handleEditCustomer(recordItem?._oid || "");
                    // }
                },
                {
                    buttonName: "View",
                    action: (oid: string) => {
                        console.log("oid--->", oid)
                        // alert("View action clicked")
                    },
                    icon: "<svg xmlns='http://www.w3.org/2000/svg' class='h-5 w-5' viewBox='0 0 20 20' fill='currentColor'><path d='M10 12a2 2 0 100-4 2 2 0 000 4z'/><path fill-rule='evenodd' d='M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z' clip-rule='evenodd'/></svg>",
                    color: "green",
                    // onClick: (recordItem: any) => {
                    //     // alert("View action clicked")
                    //     console.log("recordItem--->", recordItem)
                    //     // handleEditCustomer(recordItem?._oid || "");
                    // }
                }
            ]
        },

    ]
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
    const handlePageSizeChange = async (pageSize: number) => {
        console.log("pageSize in state", pageSize)
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
        branchManagers,
        loading,
        errors,
        setErrors,
        handleSearch,
        limit: search.limit,
        listTableStructure,
        handlePageChange,
        handlePageSizeChange,
        search,
    };
}