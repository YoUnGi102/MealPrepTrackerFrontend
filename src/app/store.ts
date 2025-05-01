import { combineReducers, configureStore } from '@reduxjs/toolkit';
import storage from 'redux-persist/lib/storage';
import { persistReducer, persistStore } from 'redux-persist';
import ingredientsReducer from '../features/ingredients/ingredientsSlice';
import authReducer from '../features/auth/authSlice'
import redirectReducer from '../features/redirect/redirectSlice'

const persistConfig = {
  key: 'root',
  storage,
};

const rootReducer = combineReducers({
  ingredients: ingredientsReducer,
  auth: authReducer,
  redirect: redirectReducer
});

const persistedReducer = persistReducer(persistConfig, rootReducer);


const store = configureStore({
  reducer: persistedReducer,
  devTools: process.env.NODE_ENV !== 'production',
});


export const persistor = persistStore(store);
export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

