import { configureStore } from '@reduxjs/toolkit';
import ingredientsReducer from '../features/ingredients/ingredientsSlice';

const store = configureStore({
  reducer: {
    ingredients: ingredientsReducer,
  },
  devTools: process.env.NODE_ENV !== 'production',
});

export default store;

// Export RootState and AppDispatch types
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
