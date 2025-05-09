import * as API from '../../utils/apiUrls';
import api from '../../api';
import { Meal, MealRequest } from '@/types';

export const postMeal = async (meal: MealRequest) => {
  console.log('Adding meal');
  try {
    const response = await api.post(API.POST_MEAL, meal);
    return response.data;
  } catch (error) {
    console.error('Failed to add meal', error);
    throw new Error('Failed to add meal');
  }
};
