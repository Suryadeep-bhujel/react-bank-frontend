export interface SearchInterface {
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
    tableColumns: ColumnTypeInterface[];
    records: any[];
    currentPage: number | null | undefined;
    totalPages: number | null | undefined;
    total?: number | null | undefined;
    limit: number | null | undefined;
    actions?: any[];
    startFrom?: number | null | undefined;
    handlePageChange: ({ }) => void;
    handlePageSizeChange: ({ }) => void;
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
    action: ({ }) => void;
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

};
export interface FormStructure {
    label: string;
    fieldName: string;
    dataType: string;
    required?: boolean;
    visible?: boolean;
    actions?: { name: string; action: string; color: string; icon: string }[];
    options?: string[] | { label: string; value: string }[];
    searchItems?: ({ }) => void;
    single?: boolean,
    onChange?: ({ }) => void;
    disabled?: boolean
}
export interface InputOptionInterface {
    label: string;
    value: number | string | bigint | null | undefined
}