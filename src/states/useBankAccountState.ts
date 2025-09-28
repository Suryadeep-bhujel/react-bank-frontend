import { useLoading } from "@context/LoadingContext";
import { BankAccountService } from "@src/openapi-request";
import { SharedStatus } from "@src/shared/SharedEnum";
import type { FormStructure, SearchInterface } from "@src/shared/SharedInterface";
import { searchResetData } from "@src/shared/SharedResetData";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useQuery, QueryClient, QueryClientProvider } from "@tanstack/react-query";
const queryClient = new QueryClient();
export interface BankAccountInterface {
    id?: number | null;
    _oid?: string;
    accountNumber?: string;
    accountType?: string;
    balance?: number;
    currency?: string;
    customerId?: string;
    createdAt?: string;
    updatedAt?: string;
    customerOids?:string[]
}

export const useBankAccountState = () => {
    const { setIsLoading, isLoading } = useLoading();
    const navigate = useNavigate();
    const [dialogTitle, setDialogTitle] = useState("Add Bank Account");
    const [errors, setErrors] = useState<Record<string, string>>({});
    const [search, setSearchParams] = useState<SearchInterface>(searchResetData);
    const [bankAccountList, setBankAccountList] = useState<BankAccountInterface[]>([]);
    
    useEffect(() => {
        getCustomersList();
    }, [search.currentPage, search.limit, search.fieldValue]);
    const getCustomersList = async () => {
        setIsLoading(true);
        const { data: response } = await BankAccountService.findAll(search)
        const accountLists = response.data.map((bankAccount: any) => {
            bankAccount.accountHolders = (bankAccount?.customers.map((customer: any) => {
                return customer?.customer?.firstName + " " + customer?.customer?.lastName
            })).join(", ");
            bankAccount.customerId = (bankAccount?.customers.map((customer: any) => {   
                return customer?.customer?.id
            })).join(", ");
            return bankAccount;
        })
        setBankAccountList(accountLists);
        let startFrom = response.currentPage > 1 ? (response.currentPage - 1) * (search.limit || 100) : 1;
        setSearchParams(prev => ({
            ...prev,
            totalPages: response.totalPages,
            total: response.total,
            startFrom,
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
    const handlePageSizeChange = async (pageSize: number) => {
        console.log("pageSize in state", pageSize)
        setSearchParams(prev => ({
            ...prev,
            limit: pageSize,
        }));
    }
    const tableColumns: FormStructure[] = [
        { label: "Account Number", fieldName: "accountNumber", dataType: "text", required: true, visible: true },
        { label: "Account Type", fieldName: "accountType", dataType: "text", required: true, visible: true },
        { label: "Balance", fieldName: "balance", dataType: "number", required: true, visible: true },
        { label: "Account Holders", fieldName: "accountHolders", dataType: "array", required: false, visible: true },
        { label: "Branch Name", fieldName: "branchName", dataType: "text", required: false, visible: true },
        { label: "Branch Code", fieldName: "branchCode", dataType: "text", required: false, visible: true },

        { label: "Currency", fieldName: "currency", dataType: "text", required: true, visible: true },
        { label: "Customer ID", fieldName: "customerId", dataType: "text", required: true, visible: true },
        { label: "Account Status", fieldName: "status", dataType: "options", required: true, visible: true, options: Object.values(SharedStatus).map(status => ({ label: status, value: status })) },
        { label: "Created At", fieldName: "createdAt", dataType: "date", required: false, visible: false },

        { label: "Actions", fieldName: "action", dataType: "action", required: false, visible: false, actions: [] }
    ]
    const actionItems = [
        {
            buttonName: "Edit",
            action: "account/edit",
            color: "blue",
            icon: "fa fa-edit",
            onClick: (recordItem: any) => {
                // alert("hello")
                navigate("/account/edit/" + recordItem._oid, { replace: true });
                //    handleEditCustomer(recordItem._oid);
            }
        },
        {
            buttonName: "View",
            action: "account/view",
            color: "green",
            icon: "fa fa-eye",
            onClick: (recordItem: any) => {
                navigate("/account/view/" + recordItem._oid, { replace: true });
            }
        }
    ]
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
        bankAccountList,
        setBankAccountList,
        dialogTitle,
        setDialogTitle,
        errors,
        setErrors,
        isLoading,
        setIsLoading,
        search,
        setSearchParams,
        handlePageSizeChange,
        handlePageChange,
        limit: search.limit || 20,
        tableColumns,
        actionItems,
        handleSearch
    };
}