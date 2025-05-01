import { combineReducers, configureStore } from '@reduxjs/toolkit';
import storage from 'redux-persist/lib/storage';
import {
  persistReducer,
  persistStore,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';
import ingredientsReducer from '../features/ingredients/ingredientsSlice';
import authReducer from '../features/auth/authSlice';
import redirectReducer from '../features/redirect/redirectSlice';
import mealReducer from '../features/meal/mealSlice';

const persistConfig = {
  key: 'root',
  storage,
};

const rootReducer = combineReducers({
  ingredients: ingredientsReducer,
  auth: authReducer,
  redirect: redirectReducer,
  meals: mealReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
  devTools: process.env.NODE_ENV !== 'production',
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        // Ignore redux-persist actions
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
        // Optional: ignore non-serializable fields in state
        ignoredPaths: ['_persist'],
      },
    }),
});

export const persistor = persistStore(store);
export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
