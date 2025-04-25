import { createSlice, createAsyncThunk, PayloadAction} from '@reduxjs/toolkit';
import { Ingredient, IngredientRequest } from '../../types';
import { getIngredients, postIngredient } from './ingredientsAPI';

export const fetchIngredients = createAsyncThunk<Ingredient[], string>(
  'ingredients/fetchIngredients',
  async (query: string) => {
    const response = await getIngredients(query);
    return response.data;
  },
);

export const addIngredient = createAsyncThunk<Ingredient, IngredientRequest>(
  'ingredients/addIngredient',
  async (data: IngredientRequest) => {
    const response = await postIngredient(data);
    return response.data;
  }
)

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
      })
      .addCase(addIngredient.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addIngredient.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.selectedIngredient = action.payload as Ingredient;
      })
      .addCase(addIngredient.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Something went wrong';
      })
  },
});

export default ingredientsSlice.reducer;
export const { setSelectedIngredient } = ingredientsSlice.actions;
