const backendURL = import.meta.env.VITE_BACKEND_URL;

export const getIngredients = async (query: string) => {
  console.log(`Fetching Ingredients from ${backendURL}`);
  const response = await fetch(`${backendURL}/api/ingredients?name=${query}`);
  if (!response.ok) {
    throw new Error('Failed to fetch ingredients');
  }
  return response.json();
};
