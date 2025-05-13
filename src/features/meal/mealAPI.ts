import * as API from '../../utils/apiUrls';
import api from '../../api';
import { MealRequest } from '@/types/entities';
import { toast } from 'react-toastify';
import { FridgeRequest } from '@/types/request/FridgeRequest';

export const postMeal = async (meal: MealRequest) => {
  console.log('Adding meal');
  try {
    const response = await api.post(API.POST_MEAL, meal);
    return response.data;
  } catch (error) {
    toast.error('Could not add meal');
    throw new Error('Failed to add meal');
  }
};

export const getMealsPaginated = async (query?: string) => {
  console.log('Getting fridge');
  try {
    const response = await api.get(API.GET_FRIDGE_MEALS_PAGINATED(query));
    console.log(response);
    return response.data;
  } catch (error) {
    toast.error('Failed to retrieve fridge meals');
    throw new Error('Failed to retrieve fridge meals');
  }
}