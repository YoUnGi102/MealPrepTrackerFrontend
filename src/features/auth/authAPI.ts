import * as API from  '../../utils/apiUrls'
import api from '../../api'

export const login = async (credentials: {username: string; password: string}) => {
  console.log('Fetching Ingredients');
  try {
    const response = await api.post(API.LOGIN, credentials);
    return response.data;
  } catch (error) {
    console.error('Failed to fetch ingredients', error);
    throw new Error('Failed to fetch ingredients');
  }
};
