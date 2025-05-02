import { MealIngredient } from '@/types';

export const calculateTotalMacros = (ingredients: MealIngredient[]) => {
  return ingredients.reduce(
    (acc, val) => {
      const { quantity, ingredient } = val;
      const factor = quantity / 100;

      acc.protein += ingredient.protein * factor;
      acc.fat += ingredient.fat * factor;
      acc.carbs += ingredient.carbs * factor;
      acc.sugar += ingredient.sugar * factor;
      acc.calories += ingredient.calories * factor;

      acc.protein = parseFloat(acc.protein.toFixed(1));
      acc.fat = parseFloat(acc.fat.toFixed(1));
      acc.carbs = parseFloat(acc.carbs.toFixed(1));
      acc.sugar = parseFloat(acc.sugar.toFixed(1));
      acc.calories = parseFloat(acc.calories.toFixed(1));

      return acc;
    },
    { protein: 0, fat: 0, carbs: 0, sugar: 0, calories: 0 },
  );
};
