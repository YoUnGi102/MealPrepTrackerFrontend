const backendURL = import.meta.env.VITE_BACKEND_URL;

export const LOGIN = `${backendURL}/api/auth/login`


export const GET_INGREDIENTS = (query: string) => `${backendURL}/api/ingredients?name=${query}`
export const POST_INGREDIENT = `${backendURL}/api/ingredients`