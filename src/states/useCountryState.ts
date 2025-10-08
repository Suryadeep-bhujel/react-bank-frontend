import { useEffect, useState } from "react"
import { CountryManagementService } from "@openapi/CountryManagementService";
import type { FormStructure, SearchInterface, TableColumnStructure } from "@src/shared/SharedInterface";
import type { CreateCountryDto } from "@src/openapi-request";
import { mapOptionLabel } from "@src/shared/SharedFunctions";
import { CountryStatus, SanctionStatus } from "@bank-app-common/enum/SharedEnum";
import { searchResetData } from "@src/shared/SharedResetData";
import { toast } from "react-toastify";
import { useLoading } from "@src/context/LoadingContext";
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
    const { setIsLoading, isLoading } = useLoading();
    const [formTitle, setFormTitle] = useState("Add Country");
    const [errors, setErrors] = useState<Record<string, string>>({});
    const [dialogType, setDialogType] = useState<string>("add");
    const [search, setSearchParams] = useState<SearchInterface>(searchResetData);

    const resetForm: CreateCountryDto = {
        _oid: undefined,
        countryName: '',
        countryCode: '',
        dialCode: '',
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
            label: "Dial Code",
            fieldName: "dialCode",
            dataType: "text",
            required: true,
            placeholder: "Enter dial code (e.g., +91)",
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
            options: mapOptionLabel(CountryStatus)
        },
        {
            label: "Sanction Status",
            fieldName: "sanctionStatus",
            dataType: "options",
            required: false,
            placeholder: "Select Sanction Status",
            visible: true,
            single: true,
            options: mapOptionLabel(SanctionStatus)
        }
    ]

    const tableColumns: TableColumnStructure[] = [
        { label: "ID", fieldName: "id", dataType: "number", visible: true },
        { label: "Country Name", fieldName: "countryName", dataType: "text", visible: true },
        { label: "Country Code", fieldName: "countryCode", dataType: "text", visible: true },
        { label: "Dial Code", fieldName: "dialCode", dataType: "text", visible: true },
        { label: "Status", fieldName: "status", dataType: "text", visible: true },
        { label: "Sanction Status", fieldName: "sanctionStatus", dataType: "text", visible: true },
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
            const { data: response } = await CountryManagementService.findAll(search);
            setCountryList(response?.data as CountryInterface[] || []);
            setTotalPages(response.totalPages)
            setTotal(response.total)
            setCurrentPage(response.currentPage)
            let startFrom = response.currentPage > 1 ? (response.currentPage - 1) * (search.limit || 100) : 1;
            setStartFrom(startFrom)
            setLimit(response?.limit);
            setIsLoading(false)
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
            let response;
            if (data?._oid) {
                response = await CountryManagementService.update({ oid: data?._oid, requestBody: data });
            } else {
                response = await CountryManagementService.create({ requestBody: data as CreateCountryDto });
            }
            setFormModal(resetForm);
            toast.success(response?.message || "Country Data saved successfully.");
            await getCountryList();
            // Simulate API success response
            return { success: true, message: response?.message || "Country Data saved successfully." };
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