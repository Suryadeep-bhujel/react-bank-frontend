import { useEffect, useState } from "react"
import { CustomerService } from "@openapi/CustomerService";
import { useLoading } from "@context/LoadingContext";
import type { CreateCustomerDto } from "@src/openapi-request";
import dayjs from "dayjs";
import { toast } from 'react-toastify';
import type { FormStructure, SearchInterface, TableColumnStructure } from "@src/shared/SharedInterface";
import { searchResetData } from "@src/shared/SharedResetData";
export interface AddedByInterface {
    id: number;
    name: string;
    email: string;
    oid: string;
}
export interface CustomerInterface {
    id?: number | null;
    _oid?: string;
    firstName?: string;
    middleName?: string;
    lastName?: string;
    email?: string;
    phoneNumber?: string;
    dateOfBirth?: string;
    createdAt?: string;
    updatedAt?: string;
    addedBy?: AddedByInterface | null;
}

export const CustomerState = () => {
    const { setIsLoading, isLoading } = useLoading();
    const [customerList, setCusomterList] = useState<CustomerInterface[]>([])
    const [dialogTitle, setDialogTitle] = useState("Add Customer");
    const [errors, setErrors] = useState<Record<string, string>>({});
    const [search, setSearchParams] = useState<SearchInterface>(searchResetData);
    const resetCustomerForm: CustomerInterface = {
        id: null,
        firstName: '',
        middleName: '',
        lastName: '',
        email: '',
        phoneNumber: '',
        dateOfBirth: ''
    }
    const [customer, setCustomerForm] = useState<CustomerInterface | null>(resetCustomerForm)
    const customerStructure: FormStructure[] = [
        { label: "First Name", fieldName: "firstName", dataType: "text", required: true, visible: true },
        { label: "First Name", fieldName: "firstName", dataType: "text", required: true, visible: true },
        { label: "Middle Name", fieldName: "middleName", dataType: "text", required: false, visible: true },
        { label: "Last Name", fieldName: "lastName", dataType: "text", required: true, visible: true },
        { label: "Email", fieldName: "email", dataType: "email", required: true, visible: true },
        { label: "Phone No.", fieldName: "phoneNumber", dataType: "text", required: true, visible: true },
        { label: "Date Of Birth", fieldName: "dateOfBirth", dataType: "date", required: true, visible: true },
        { label: "Actions", fieldName: "action", dataType: "action", required: false, visible: false, actions: [] }
    ]
    const listTableStructure: TableColumnStructure[] = [
        { label: "Customer ID", fieldName: "customerId", dataType: "text", visible: true },
        { label: "Full Name", fieldName: "fullName", dataType: "text", visible: true },
        { label: "Official ID No.", fieldName: "officialIdNo", dataType: "text", visible: true },
        { label: "Email", fieldName: "email", dataType: "email", visible: true },
        { label: "Phone No.", fieldName: "phoneNumber", dataType: "text", visible: true },
        { label: "Date Of Birth", fieldName: "dateOfBirth", dataType: "date", visible: true },
        { label: "Gender", fieldName: "gender", dataType: "text", visible: true },
        { label: "Mobile No", fieldName: "phoneNumber", dataType: "text", visible: true },
        { label: "Nationality", fieldName: "nationality", dataType: "text", visible: true },
        { label: "PAN No.", fieldName: "panNumber", dataType: "text", visible: true },

        { label: "Actions", fieldName: "action", dataType: "action", visible: false, actions: [
            {
                buttonName: "Edit",
                action: (oid: string) => {
                    // alert("Edit action clicked")
                },
                icon: "<svg xmlns='http://www.w3.org/2000/svg' class='h-5 w-5' viewBox='0 0 20 20' fill='currentColor'><path d='M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z'/></svg>",
                color: "blue",
                onClick: (recordItem: CustomerInterface) => {
                    // alert("Edit action clicked")
                    handleEditCustomer(recordItem?._oid || "");
                }
            },
            {
                buttonName: "View",
                action: (oid: string) => {
                    // alert("View action clicked")
                },
                icon: "<svg xmlns='http://www.w3.org/2000/svg' class='h-5 w-5' viewBox='0 0 20 20' fill='currentColor'><path d='M10 12a2 2 0 100-4 2 2 0 000 4z'/><path fill-rule='evenodd' d='M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z' clip-rule='evenodd'/></svg>",
                color: "green",
                onClick: (recordItem: CustomerInterface) => {
                    // alert("View action clicked")
                    // handleEditCustomer(recordItem?._oid || "");
                }
            }
        ] },

    ]
    useEffect(() => {
        getCustomersList();
    }, [search.currentPage, search.limit, search.fieldValue]);
    const getCustomersList = async () => {
        setIsLoading(true);
        const { data: response } = await CustomerService.findAll(search)
        setCusomterList(response?.data.map((item:CustomerInterface) => ({
            ...item,
            dateOfBirth: item?.dateOfBirth ? dayjs(item?.dateOfBirth).format("DD-MM-YYYY") : '',
            fullName: `${item?.firstName || ''} ${item?.middleName || ''} ${item?.lastName || ''}`.replace(/\s+/g, ' ').trim()
        })) || [])
        console.log("customer list response", response);
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
    const saveCustomer = async (data: CustomerInterface) => {
        setIsLoading(true);
        try {
            setIsLoading(true);
            data.dateOfBirth = dayjs(data?.dateOfBirth).format("DD-MM-YYYY");
            let response;
            if (data?._oid) {
                // Update existing customer
                response = await CustomerService.update({ oid: data?._oid, requestBody: data as CreateCustomerDto });
                // Reset the form after successful update
                toast.success("Customer updated successfully!");
                setCustomerForm(resetCustomerForm);
            } else {
                response = await CustomerService.create({ requestBody: data as CreateCustomerDto });
                // Reset the form after successful creation
                setCustomerForm(resetCustomerForm);
                // Optionally, refresh the customer list or update state here
                toast.success("Customer created successfully!");
            }
            setIsLoading(false);
            await getCustomersList();
            return {
                success: true,
                message: response?.message || "Operation successful",
                data: response
            };
        } catch (error) {
            console.error("Error creating customer:", error?.body);
            setIsLoading(false);
            toast.error("Failed to create customer. Please try again.");
            setErrors(error?.[body]?.message || error?.message || {});
            return {
                message: error?.body?.message ?? error.message,
                success: false
            };
            // alert(error?.message || "Failed to create customer. Please try again.");
        }
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
        getCustomersList,
        handlePageChange,
        handlePageSizeChange,
        customerList,
        search,
        isLoading,
        customer,
        setCustomerForm,
        customerStructure,
        setIsLoading,
        saveCustomer,
        resetCustomerForm,
        dialogTitle,
        setDialogTitle,
        errors,
        setErrors,
        handleSearch,
        limit: search.limit,
        listTableStructure
    }
}