import { Macros, MealIngredient, TotalMacros } from '@/types/entities';

const initialMacros: Macros = { protein: 0, fat: 0, carbs: 0, sugar: 0, calories: 0}

export const calculateTotalMacros = (
  ingredients: MealIngredient[],
): TotalMacros => {
  return ingredients.reduce(
    (acc, val) => {
      const { quantity, ingredient } = val;
      const factor = quantity / 100;

      acc.protein += ingredient.protein * factor;
      acc.fat += ingredient.fat * factor;
      acc.carbs += ingredient.carbs * factor;
      acc.sugar += ingredient.sugar * factor;
      acc.calories += ingredient.calories * factor;
      acc.quantity += ingredient.calories * factor;

      acc.protein = parseFloat(acc.protein.toFixed(1));
      acc.fat = parseFloat(acc.fat.toFixed(1));
      acc.carbs = parseFloat(acc.carbs.toFixed(1));
      acc.sugar = parseFloat(acc.sugar.toFixed(1));
      acc.calories = parseFloat(acc.calories.toFixed(1));
      acc.quantity = parseFloat(acc.quantity.toFixed(1));

      return acc;
    },
    {...initialMacros, quantity: 0 },
  );
};

export const calculateMacrosPerPortion = (macros: Macros, portions: number): Macros => {
  if (portions <= 0) return initialMacros;

  return {
    protein: Math.floor((macros.protein / portions * 10)) / 10,
    fat: Math.floor((macros.fat / portions * 10)) / 10,
    carbs: Math.floor((macros.carbs / portions * 10)) / 10,
    sugar: Math.floor((macros.sugar / portions * 10)) / 10,
    calories: Math.floor((macros.calories / portions * 10)) / 10,
  };
};

export const buildQueryFromSearchParams = (searchParams: URLSearchParams): string => {
  const params: string[] = [];
  searchParams.forEach((value, key) => {
    if (value) {
      params.push(`${encodeURIComponent(key)}=${encodeURIComponent(value)}`);
    }
  });
  return params.length ? `?${params.join('&')}` : '';
};