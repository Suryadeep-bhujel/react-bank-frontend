import { useEffect, useState } from "react"
import { CustomerService } from "@openapi/CustomerService";
import { useLoading } from "@context/LoadingContext";
import type { CreateCustomerDto } from "@src/openapi-request";
import dayjs from "dayjs";
import { toast } from 'react-toastify';
import type { FormStructure } from "@src/shared/SharedInterface";
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
    // const [isLoading, setIsLoading] = useState<Boolean>(true)
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
        { label: "First Name", fieldName: "firstName", dataType: "text", required: true },
        { label: "Middle Name", fieldName: "middleName", dataType: "text", required: false },
        { label: "Last Name", fieldName: "lastName", dataType: "text", required: true },
        { label: "Email", fieldName: "email", dataType: "email", required: true },
        { label: "Phone No.", fieldName: "phoneNumber", dataType: "text", required: true },
        { label: "Date Of Birth", fieldName: "dateOfBirth", dataType: "date", required: true },
    ]

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
    }, [search.currentPage, search.limit, search.fieldValue]);
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
            setErrors(error?.body?.message || error?.message || {});
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
        handleSearch
    }
}