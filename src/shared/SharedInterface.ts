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
    pageChanged: (page: number) => void;
    pageSizeChanged: (page: number) => void;

}
export interface ColumnTypeInterface {
    name: string;
    fieldName: string;
    dataType: string;
}
export interface ListTableInterface {
    tableColumns: ColumnTypeInterface[];
    records: any[];
    currentPage: number;
    totalPages: number;
    limit: number;
    actions?: any[];
    updatePermission: (roldOid: string) => void;
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
export interface TableColumns{
    name: string;
    fieldName: string;
    label?: string;
    dataType: string;
    actions?: { name: string; action: string; color: string; icon: string }[];

};
export interface FormStructure {
    label: string;
    fieldName: string;
    dataType: string;
    required: boolean;
}