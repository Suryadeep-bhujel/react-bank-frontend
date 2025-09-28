import { useEffect, useState } from "react"
import { BranchManagementService } from "@openapi/BranchManagementService";
import type { FormStructure, TableColumnStructure } from "@src/shared/SharedInterface";
import { mapOptionLabel } from "@src/shared/SharedFunctions";
import { BranchStatus, BranchType } from "@src/shared/BranchEnum";
import type { CreateBranchDto } from "@src/openapi-request";
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
    const [formTitle, setDialogTitle] = useState("Add Branch");
    const [errors, setErrors] = useState<Record<string, string>>({});
    const [dialogType, setDialogType] = useState<string>("add");

    const resetForm : CreateBranchDto = {
        _oid: undefined,
        branchName: '',
        branchCode: '',
        branchAddress: '',
        branchPhoneNumber: '',
        branchEmail: '',
        branchWebsite: '',
        branchDescription: '',
        branchType: '',
        branchStatus: '',
        managerId: undefined,
    }
    const [formModal, setFormModal] = useState<Record<string, any>>({ ...resetForm });

    const formStructure: FormStructure[] = [
        {
            label: "Branch Name",
            fieldName: "branchName",
            dataType: "text",
            required: true,
            placeholder: "Enter branch name",
            visible: true,
            single: true,
        },
        {
            label: "Branch Code",
            fieldName: "branchCode",
            dataType: "text",
            required: true,
            placeholder: "Enter branch code",
            visible: true,
            single: true,
        },
        {
            label: "Branch Address",
            fieldName: "branchAddress",
            dataType: "textarea",
            required: true,
            placeholder: "Enter branch address",
            visible: true,
            single: true,
        },
        {
            label: "Branch Phone Number",
            fieldName: "branchPhoneNumber",
            dataType: "text",
            required: true,
            placeholder: "Enter phone number",
            visible: true,
            single: true,
        },
        {
            label: "Branch Email",
            fieldName: "branchEmail",
            dataType: "email",
            required: true,
            placeholder: "Enter email",
            visible: true,
            single: true,
        },
        {
            label: "Branch Website",
            fieldName: "branchWebsite",
            dataType: "text",
            required: true,
            placeholder: "Enter website url",
            visible: true,
            single: true,
        },
        {
            label: "Branch Description",
            fieldName: "branchDescription",
            dataType: "textarea",
            required: true,
            placeholder: "Enter branch description",
            visible: true,
            single: true,
        },
        
        {
            label: "Branch Type",
            fieldName: "branchType",
            dataType: "options",
            required: true,
            placeholder: "Select branch type",
            visible: true,
            single: true,
            options: mapOptionLabel(BranchType)

        },
        {
            label: "Branch Status",
            fieldName: "branchStatus",
            dataType: "options",
            required: true,
            placeholder: "Select status",
            visible: true,
            single: true,
            options: mapOptionLabel(BranchStatus)
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
        { label: "Branch Name", fieldName: "branchName", dataType: "text", visible: true },
        { label: "Branch Code", fieldName: "branchCode", dataType: "text", visible: true },
        { label: "Branch Address", fieldName: "branchAddress", dataType: "text", visible: true },
        { label: "Branch Phone No.", fieldName: "branchPhoneNumber", dataType: "text", visible: true },
        { label: "Branch Email", fieldName: "branchEmail", dataType: "text", visible: true },
        { label: "Branch Type", fieldName: "branchType", dataType: "text", visible: true },
        { label: "Branch Status", fieldName: "branchStatus", dataType: "text", visible: true },
        {
            label: "Actions", fieldName: "actions", dataType: "action", visible: false, actions: [
                {
                    buttonName: "Edit",
                    icon: "sdf",
                    color: "sdfsdf",
                    action: (record: any) => {
                        console.log("recordItem ", record)
                        alert(record._oid)
                    }
                },
                {
                    buttonName: "View",
                    icon: "sdf",
                    color: "sdfsdf",
                    action: (record: any) => {
                        console.log("recordItem ", record)
                        alert(record._oid)
                    }
                }
            ]
        },
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
    const setIsDialogOpen = (val: boolean) => {
        // setOpenFormModal(val);
    }
    const submitForm = async (data: Record<string, any>) => {
        setIsLoading(true);
        try {
            setIsLoading(true);
            let response;
            if (data?._oid) {
                // Update existing branch
                response = await BranchManagementService.update({ oid: data?._oid, requestBody: data });
                // Reset the form after successful update
                // toast.success("Branch updated successfully!");
                setFormModal(resetForm);
            } else {
                // Create new branch
                response = await BranchManagementService.create({ requestBody: data });
                // Reset the form after successful creation
                // toast.success("Branch created successfully!");
                setFormModal(resetForm);
            }
            await getBranchList();
            setIsLoading(false);
            return response;
        } catch (error: any) {
            console.error("Error submitting form:", error);
            if (error?.response?.data?.errors) {
                const apiErrors = error.response.data.errors;
                const formattedErrors: Record<string, string> = {};
                apiErrors.forEach((err: { field: string; message: string }) => {
                    formattedErrors[err.field] = err.message;
                });
                setErrors(formattedErrors);
                return {
                    success: false,
                    message: "Validation errors occurred.",
                    data: null
                };
            } else {
                // Handle other types of errors (e.g., network issues)
                setErrors({ general: "An unexpected error occurred. Please try again later." });
                return {
                    success: false,
                    message: "An unexpected error occurred. Please try again later.",
                    data: null
                };
            }
        } finally {
            setIsLoading(false);
        }
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
        handleSearch,
        setIsDialogOpen,
        // isDialogOpen,
        errors,
        resetForm,
        formTitle,
        formStructure,
        dialogType,
        formModal,
        submitForm
    }
}