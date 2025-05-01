import { Ingredient } from './Ingredient';

export interface Meal {
  id: number;
  name: string;
  type: string;
  portions: number;
  image?: string;
}

export interface MealIngredient {
  ingredient: Ingredient;
  quantity: number;
}
