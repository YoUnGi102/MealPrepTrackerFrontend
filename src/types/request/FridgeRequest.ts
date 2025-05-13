import { PaginatedRequest } from "../Paginated";

export interface FridgeRequest extends PaginatedRequest{
    filter?: string,
}