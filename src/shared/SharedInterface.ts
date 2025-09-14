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