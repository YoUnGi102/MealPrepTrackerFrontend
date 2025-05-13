const backendURL = import.meta.env.VITE_BACKEND_URL;

export const LOGIN = `${backendURL}/api/auth/login`;

// Ingredients
export const GET_INGREDIENTS = (query: string) =>
  `${backendURL}/api/ingredients?name=${query}`;
export const POST_INGREDIENT = `${backendURL}/api/ingredients`;

// Meals
export const POST_MEAL = `${backendURL}/api/meals`;
export const GET_FRIDGE_MEALS_PAGINATED = (query?: string) => `${backendURL}/api/fridge/meals?${query || ''}`
