import { useLoading } from "@context/LoadingContext";
import { BankAccountService } from "@src/openapi-request";
import type { SearchInterface, TableColumnStructure } from "@src/shared/SharedInterface";
import { searchResetData } from "@src/shared/SharedResetData";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
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
    customerOids?: string[]
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
    const tableColumns: TableColumnStructure[] = [
        { label: "Account Number", fieldName: "accountNumber", dataType: "text", visible: true },
        { label: "Account Type", fieldName: "accountType", dataType: "text", visible: true },
        { label: "Balance", fieldName: "balance", dataType: "number", visible: true },
        { label: "Account Holders", fieldName: "accountHolders", dataType: "array", visible: true },
        { label: "Branch Name", fieldName: "branchName", dataType: "text", visible: true },
        { label: "Branch Code", fieldName: "branchCode", dataType: "text", visible: true },

        { label: "Currency", fieldName: "currency", dataType: "text", visible: true },
        { label: "Customer ID", fieldName: "customerId", dataType: "text", visible: true },
        { label: "Account Status", fieldName: "status", dataType: "options", visible: true },
        { label: "Created At", fieldName: "createdAt", dataType: "date", visible: false },

        {
            label: "Actions", fieldName: "action", dataType: "action", visible: false, actions: [
                {
                    buttonName: "Edit",
                    action: (recordItem: any) => {
                        // alert("hello")
                        navigate("/account/edit/" + recordItem._oid, { replace: true });
                        //    handleEditCustomer(recordItem._oid);
                    },
                    color: "blue",
                    icon: "fa fa-edit",
                },
                {
                    buttonName: "View",
                    action:(recordItem: any) => {
                        // alert("hello")
                        navigate("/account/view/" + recordItem._oid, { replace: true });
                        //    handleEditCustomer(recordItem._oid);
                    },
                    color: "green",
                    icon: "fa fa-eye",
                }
            ]
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
        handleSearch
    };
}