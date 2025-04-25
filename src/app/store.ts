import { configureStore } from '@reduxjs/toolkit';
import ingredientsReducer from '../features/ingredients/ingredientsSlice';
import authReducer from '../features/auth/authSlice'

const store = configureStore({
  reducer: {
    ingredients: ingredientsReducer,
    auth: authReducer,
  },
  devTools: process.env.NODE_ENV !== 'production',
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
