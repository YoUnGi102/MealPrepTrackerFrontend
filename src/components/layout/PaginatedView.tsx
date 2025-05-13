import { RootState } from "@/app/store";
import { useState } from "react";
import { useSelector } from "react-redux";

export const PaginatedView = () => {
    const {pageSize, setPageSize} = useState(10);
    const {pageIndex, setPageIndex} = useState(0);
    const {totalCount, setTotalCount} = useState(0);

    const {} = useSelector((state: RootState )=> state.)
}