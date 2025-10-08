export interface SearchInterface {
    fieldName?: string;
    fieldValue?: string;
    page: number;
    limit?: number;
    sortBy?: string;
    sortOrder?: string;
    totalPages: number;
    total: number;
    currentPage?: number;
    startFrom?: number;
}
export interface PaginationProps {
    totalPages: number;
    startFrom: number;
    records: number;
    total: number;
    currentPage: number;
    limit: number;
    pageChanged: (page: number) => void;
    pageSizeChanged: (page: number) => void;

}
export interface ColumnTypeInterface {
    name: string;
    fieldName: string;
    dataType: string;
    required?: boolean;
}
export interface ListTableInterface {
    tableColumns: TableColumnStructure[];
    records: any[];
    currentPage?: number;
    totalPages: number;
    total?: number;
    limit?: number;
    actions?: any[];
    startFrom?: number;
    handlePageChange: (pageNo: number) => void;
    handlePageSizeChange: (pageSize: number) => void;
    paginationSpace?: string;
    handleSearch: (fieldName: string, fieldValue: any) => void;
}
export interface DialogProps {
    isDialogOpen: boolean;
    onClose: () => void;
    onSave: (formInputs: Record<string, any>) => void;
    dialogType?: string;
    dialogTitle?: string;
    formStructure?: any;
    formInputs?: any;
    formErrors?: any;
}
export interface SearchProps {
    fieldName?: string,
    fieldValue?: string,
    page?: number,
    limit?: number,
    sortBy?: string,
    sortOrder?: string,
}
export interface ActionTypeInterface {
    name: string;
    action: string;
    color: string;
    icon: string;
}
export interface BadgeTypeInterface {
    name: string;
    color: string;
}
export interface StatusTypeInterface {
    name: string;
    color: string;
}
export interface TabTypeInterface {
    name: string;
    label: string;
}
export interface TabPanelProps {
    children?: React.ReactNode;
    index: number;
    value: number;
}
export interface ActionInterface {
    buttonName: string;
    action: (record: any) => void;
    color?: string;
    icon?: string
}
export interface TableColumnStructure {
    name?: string;
    fieldName: string;
    label?: string;
    dataType: string;
    actions?: ActionInterface[];
    visible?: boolean;
    options?: string[] | { label: string; value: string }[];

};
export interface FormStructure {
    label: string;
    fieldName: string;
    dataType: string;
    required?: boolean;
    visible?: boolean;
    actions?: { name: string; action: string; color: string; icon: string }[];
    options?: string[] | { label: string; value: string }[];
    multiSelect?: boolean;
    searchItems?: (params: any) => void;
    single?: boolean,
    onChange?: ({ }) => void;
    disabled?: boolean
    placeholder?: string
}
export interface InputOptionInterface {
    label: string;
    value: number | string | bigint | null | undefined
}