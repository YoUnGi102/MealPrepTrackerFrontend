import { Ingredient } from './Ingredient';

export enum SaveOption {
  MEAL = 'm',
  RECIPE = 'r',
  MEAL_RECIPE = 'mr'
}

export interface Meal extends Macros {
  id?: number;
  name: string;
  type: string;
  portions: number;
  image?: string;
  ingredients: MealIngredient[];
  saveOption: SaveOption;
}

export interface MealRequest {
  id?: number;
  name: string;
  type: string;
  portions: number;
  image?: string;
  ingredients: {
    ingredientId: number,
    quantity: number,
  }[];
  saveOption: SaveOption;
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
