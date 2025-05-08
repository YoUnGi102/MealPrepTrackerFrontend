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

export interface Macros {
  protein: number;
  fat: number;
  carbs: number;
  sugar: number;
  calories: number;
}

export interface TotalMacros extends Macros {
  quantity: number;
}

export interface MealIngredient {
  ingredient: Ingredient;
  quantity: number;
}
