export interface PaginatedRequest {
    pageIndex: number;
    pageSize: number;
}

export interface Paginated<T> {
    data: T[];
    pageIndex: number;
    pageSize: number;
    totalCount: number;
}

export const initialPaginated: Paginated<any> =  {
    data: [],
    pageSize: 10,
    pageIndex: 0,
    totalCount: 0
}