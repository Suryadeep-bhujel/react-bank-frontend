import { useEffect, useState } from "react"
import { CountryService } from "@openapi/CountryService";
import type { FormStructure, TableColumnStructure } from "@src/shared/SharedInterface";
import type { CreateCountryDto, UpdateCountryDto } from "@src/openapi-request";
export interface Search {
    fieldName?: string,
    fieldValue?: string,
    page?: number,
    limit?: number,
    sortBy?: string,
    sortOrder?: string,
}

export interface CountryInterface {
    id?: number | null;
    _oid?: string;
    countryName?: string;
    countryCode?: string;
    callCode?: string;
    status?: 'ACTIVE' | 'INACTIVE';
    createdAt?: string;
    updatedAt?: string;
}

export const useCountryState = () => {
    const [countryList, setCountryList] = useState<CountryInterface[]>([])
    const [limit, setLimit] = useState<number>(20);
    const [totalPages, setTotalPages] = useState<number>(0)
    const [total, setTotal] = useState<number>(0)
    const [currentPage, setCurrentPage] = useState<number>(1)
    const [startFrom, setStartFrom] = useState<number>(0)
    const [isLoading, setIsLoading] = useState<Boolean>(true)
    const [formTitle, setFormTitle] = useState("Add Country");
    const [errors, setErrors] = useState<Record<string, string>>({});
    const [dialogType, setDialogType] = useState<string>("add");

    const resetForm : CreateCountryDto = {
        _oid: undefined,
        countryName: '',
        countryCode: '',
        callCode: '',
        status: 'ACTIVE',
    }
    const [formModal, setFormModal] = useState<Record<string, any>>({ ...resetForm });

    const formStructure: FormStructure[] = [
        {
            label: "Country Name",
            fieldName: "countryName",
            dataType: "text",
            required: true,
            placeholder: "Enter country name",
            visible: true,
            single: true,
        },
        {
            label: "Country Code",
            fieldName: "countryCode",
            dataType: "text",
            required: true,
            placeholder: "Enter country code (e.g., IN)",
            visible: true,
            single: true,
        },
        {
            label: "Call Code",
            fieldName: "callCode",
            dataType: "text",
            required: true,
            placeholder: "Enter call code (e.g., +91)",
            visible: true,
            single: true,
        },
        {
            label: "Status",
            fieldName: "status",
            dataType: "options",
            required: true,
            placeholder: "Select status",
            visible: true,
            single: true,
            options: [
                { label: "Active", value: "ACTIVE" },
                { label: "Inactive", value: "INACTIVE" }
            ]
        },
    ]

    const [search, setSearchParams] = useState<Search>({
        fieldName: '',
        fieldValue: '',
        limit: limit,
        page: currentPage,
    });

    const tableColumns: TableColumnStructure[] = [
        { label: "ID", fieldName: "id", dataType: "number", visible: true },
        { label: "Country Name", fieldName: "countryName", dataType: "text", visible: true },
        { label: "Country Code", fieldName: "countryCode", dataType: "text", visible: true },
        { label: "Call Code", fieldName: "callCode", dataType: "text", visible: true },
        { label: "Status", fieldName: "status", dataType: "text", visible: true },
        {
            label: "Actions", fieldName: "actions", dataType: "action", visible: false, actions: [
                {
                    buttonName: "Edit",
                    icon: "fa fa-edit",
                    color: "blue",
                    action: (record: any) => {
                        setFormModal(record);
                        setFormTitle("Edit Country");
                        setDialogType("edit");
                    }
                },
                {
                    buttonName: "View",
                    icon: "fa fa-eye",
                    color: "green",
                    action: (record: any) => {
                        setFormModal(record);
                        setFormTitle("View Country");
                        setDialogType("view");
                    }
                }
            ]
        },
    ]

    useEffect(() => {
        setIsLoading(true);
        getCountryList();
    }, [search.fieldValue, search.limit, search.page]);

    const getCountryList = async () => {
        try {
            // Mock data for demonstration since API is not available
            const mockResponse = {
                data: [
                    { 
                        id: 1, 
                        _oid: "country_1", 
                        countryName: "India", 
                        countryCode: "IN", 
                        callCode: "+91", 
                        status: "ACTIVE" as const,
                        createdAt: "2024-01-01",
                        updatedAt: "2024-01-01"
                    },
                    { 
                        id: 2, 
                        _oid: "country_2", 
                        countryName: "United States", 
                        countryCode: "US", 
                        callCode: "+1", 
                        status: "ACTIVE" as const,
                        createdAt: "2024-01-01",
                        updatedAt: "2024-01-01"
                    },
                    { 
                        id: 3, 
                        _oid: "country_3", 
                        countryName: "United Kingdom", 
                        countryCode: "GB", 
                        callCode: "+44", 
                        status: "INACTIVE" as const,
                        createdAt: "2024-01-01",
                        updatedAt: "2024-01-01"
                    },
                    { 
                        id: 4, 
                        _oid: "country_4", 
                        countryName: "Canada", 
                        countryCode: "CA", 
                        callCode: "+1", 
                        status: "ACTIVE" as const,
                        createdAt: "2024-01-01",
                        updatedAt: "2024-01-01"
                    },
                    { 
                        id: 5, 
                        _oid: "country_5", 
                        countryName: "Australia", 
                        countryCode: "AU", 
                        callCode: "+61", 
                        status: "ACTIVE" as const,
                        createdAt: "2024-01-01",
                        updatedAt: "2024-01-01"
                    }
                ],
                totalPages: 1,
                total: 5,
                currentPage: 1,
                limit: 20
            };

            setCountryList(mockResponse?.data || []);
            setTotalPages(mockResponse.totalPages || 0)
            setTotal(mockResponse.total || 0)
            setCurrentPage(mockResponse.currentPage || 1)
            let startFrom = mockResponse.currentPage > 1 ? (mockResponse.currentPage - 1) * (search.limit || 100) : 1;
            setStartFrom(startFrom)
            setLimit(mockResponse?.limit || 20);
        } catch (error) {
            console.error("Error fetching countries:", error);
            setCountryList([]);
        } finally {
            setIsLoading(false)
        }
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

    const submitForm = async (data: Record<string, any>) => {
        setIsLoading(true);
        try {
            setIsLoading(true);
            
            // Mock implementation for demonstration
            if (data?._oid) {
                // Simulate update existing country
                console.log("Updating country:", data);
                // Update the country in the list
                setCountryList(prev => prev.map(country => 
                    country._oid === data._oid ? { ...country, ...data } : country
                ));
                setFormModal(resetForm);
            } else {
                // Simulate create new country
                console.log("Creating country:", data);
                const newCountry = {
                    ...data,
                    id: Date.now(),
                    _oid: `country_${Date.now()}`,
                    createdAt: new Date().toISOString(),
                    updatedAt: new Date().toISOString()
                };
                setCountryList(prev => [...prev, newCountry]);
                setFormModal(resetForm);
            }
            
            // Simulate API success response
            return { success: true, message: "Country saved successfully" };
        } catch (error: any) {
            console.error("Error submitting form:", error);
            setErrors(error?.body?.message || error?.message || {});
            throw error;
        } finally {
            setIsLoading(false);
        }
    }

    const openAddDialog = () => {
        setFormModal({ ...resetForm });
        setFormTitle("Add Country");
        setDialogType("add");
        setErrors({});
    }

    return {
        getCountryList,
        handlePageChange,
        handlePageSizeChange,
        countryList,
        limit,
        search,
        totalPages,
        total,
        currentPage,
        startFrom,
        isLoading,
        tableColumns,
        handleSearch,
        errors,
        resetForm,
        formTitle,
        formStructure,
        dialogType,
        formModal,
        submitForm,
        openAddDialog,
        setFormModal,
        setFormTitle,
        setDialogType,
        setErrors
    }
}