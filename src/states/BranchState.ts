import { useEffect, useState } from "react"
import { BranchManagementService } from "@openapi/BranchManagementService";
import type { FormStructure, SearchInterface, TableColumnStructure } from "@src/shared/SharedInterface";
import { mapOptionLabel } from "@src/shared/SharedFunctions";
import { BranchStatus, BranchType } from "@bank-app-common/enum/branch-enum";
import { UsersManagementService, type CreateBranchDto } from "@src/openapi-request";
import { searchResetData } from "@src/shared/SharedResetData";
export const BranchState = () => {
    const [branchList, setBranchList] = useState<any[]>([])
    const [limit, setLimit] = useState<number>(20);
    const [totalPages, setTotalPages] = useState<number>(0)
    const [total, setTotal] = useState<number>(0)
    const [currentPage, setCurrentPage] = useState<number>(1)
    const [startFrom, setTstartFrom] = useState<number>(0)
    const [isLoading, setIsLoading] = useState<Boolean>(true)
    const [formTitle] = useState("Add Branch");
    const [errors, setErrors] = useState<Record<string, string>>({});
    const [dialogType] = useState<string>("add");
    const [userList, setUserList] = useState<any[]>([]);

    const resetForm: CreateBranchDto = {
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
        managerOid: undefined,
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
            label: "Branch Manager",
            fieldName: "managerOid",
            dataType: "options",
            required: true,
            placeholder: "Select branch Manager",
            visible: true,
            single: true,
            options: userList.map(user => ({ label: user.fullName, value: user._oid })),
            searchItems: (value: string) => {
                setUserSearch(prev => ({
                    ...prev,
                    fieldName: 'fullName',
                    fieldValue: value,
                    page: 1
                }))
            },

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
    const [search, setSearchParams] = useState<SearchInterface>(searchResetData);
    const [userSearch, setUserSearch] = useState<SearchInterface>({ ...searchResetData, limit: 1000 });
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
    useEffect(() => {
        getUsers()
    }, [userSearch.fieldValue, userSearch.limit, userSearch.page]);
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
                response = await BranchManagementService.create({ requestBody: data as CreateBranchDto });
                // Reset the form after successful creation
                // toast.success("Branch created successfully!");
                setFormModal(resetForm);
            }
            await getBranchList();
            // setIsLoading(false);
            return response;
        } catch (error: any) {
            console.error("Error submitting form:", error);
            setErrors(error?.body?.message || error?.message || {});
        } finally {
            // setIsLoading(false);
        }
    }
    const getUsers = async () => {
        const { data: response } = await UsersManagementService.userDropdown(userSearch);
        setUserList(response?.data || []);
        return response;
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