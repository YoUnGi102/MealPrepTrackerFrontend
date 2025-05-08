import { Ingredient } from './Ingredient';

export interface Meal {
  id?: number;
  name: string;
  type: string;
  portions: number;
  image?: string;
  ingredients: {
    ingredientId: number;
    quantity: number;
  }[];
}

export interface TotalMacros {
  protein: number;
  fat: number;
  carbs: number;
  sugar: number;
  calories: number;
  quantity: number;
}

export interface MealIngredient {
  ingredient: Ingredient;
  quantity: number;
}
