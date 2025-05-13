import { AppDispatch, RootState } from "@/app/store";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";
import { getFridgeMeals } from "../mealSlice";
import MealView from "@/components/common/MealView";
import { Meal } from "@/types/entities";

const FridgePage = () => {
    const [searchParams, setSearchParams] = useSearchParams()
    const dispatch = useDispatch<AppDispatch>();
    const {data, pageIndex, pageSize, totalCount} = useSelector((state: RootState) => 
        state.meals.mealsPaginated
    );

    const [filter, setFilter] = useState();
    console.log(data, pageIndex, pageSize, totalCount);

    useEffect(() => {
        dispatch(getFridgeMeals({filter, pageIndex: 0, pageSize: 10}));
    }, [filter, pageIndex, pageSize]);

    return <div>
        {data && data.map((meal) => <MealView meal={meal as Meal} />)}
    </div>
}

export default FridgePage;