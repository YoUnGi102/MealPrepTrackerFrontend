import { Macros, Meal } from "@/types/entities";
import NutrientIcons from "./NutrientIcons";

type Props = {
    meal: Meal
}

const MealView: React.FC<Props> = ({meal}) => {

    const macros: Macros = {
        protein: meal.protein,
        carbs: meal.carbs,
        sugar: meal.sugar,
        fat: meal.fat,
        calories: meal.calories
    };

    return (
        <div >
            <h2>{meal.name}</h2>
            <NutrientIcons macros={macros} />
            <div>{meal.portions}</div>
            <button>Log</button>
        </div>
    )
}

export default MealView;