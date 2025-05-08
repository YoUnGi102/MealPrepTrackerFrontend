import * as API from '../../utils/apiUrls';
import api from '../../api';
import { IngredientRequest } from '@/types';

export const getIngredients = async (query: string) => {
  console.log('Fetching Ingredients');
  try {
    const response = await api.get(API.GET_INGREDIENTS(query));
    return response.data;
  } catch (error) {
    console.error('Failed to fetch ingredients', error);
    throw new Error('Failed to fetch ingredients');
  }
};

export const postIngredient = async (ingredient: IngredientRequest) => {
  console.log('Adding ingredient');
  try {
    const response = await api.post(API.POST_INGREDIENT, ingredient);
    return response.data;
  } catch (error) {
    console.error('Failed to add ingredient', error);
    throw new Error('Failed to add ingredient');
  }
};
