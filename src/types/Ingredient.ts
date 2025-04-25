export interface Ingredient {
    id: string;
    name: string;
    type: string;
    protein: number;
    fat: number;
    carbs: number;
    sugar: number;
    calories: number;
    image: string;
}

export interface IngredientRequest {
    name: string;
    type: string;
    protein: string;
    fat: string;
    carbs: string;
    sugar: string;
    calories: string;
    image?: string;
}