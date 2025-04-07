import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { Ingredient } from '../../types';
import { getIngredients } from './ingredientsAPI';

export const fetchIngredients: any = createAsyncThunk<Ingredient[], string>(
  'ingredients/fetchIngredients',
  async (query: string) => {
    const response = await getIngredients(query);
    return response.data;
  },
);

export interface IngredientsState {
  ingredients: Ingredient[];
  loading: boolean;
  error: string | null;
  selectedIngredient: Ingredient | null;
}

const initialState: IngredientsState = {
  ingredients: [],
  loading: false,
  error: null,
  selectedIngredient: null,
};

const ingredientsSlice = createSlice({
  name: 'ingredients',
  initialState,
  reducers: {
    setSelectedIngredient(state, action: PayloadAction<Ingredient>) {
      state.selectedIngredient = action.payload;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(fetchIngredients.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchIngredients.fulfilled, (state, action) => {
        state.ingredients = action.payload;
        state.loading = false;
      })
      .addCase(fetchIngredients.rejected, (state, action) => {
        state.error = action.error.message || 'Something went wrong';
        state.loading = false;
      });
  },
});

export default ingredientsSlice.reducer;
export const { setSelectedIngredient } = ingredientsSlice.actions;
