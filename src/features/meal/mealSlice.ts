import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { Meal, MealIngredient, Ingredient } from '../../types';

// export const fetchIngredients = createAsyncThunk<Ingredient[], string>(
//   'ingredients/fetchIngredients',
//   async (query: string) => {
//     const response = await getIngredients(query);
//     return response.data;
//   },
// );

export const addMeal = createAsyncThunk<Meal, Meal>(
  'ingredients/addIngredient',
  async (data: Meal) => {
    const response = await postMeal(data);
    return response.data;
  },
);

export interface MealState {
  ingredients: Meal[];
  loading: boolean;
  error: string | null;
  selectedMeal: Meal | null;
  mealIngredients: MealIngredient[]; // when creating Meal
}

const initialState: MealState = {
  ingredients: [],
  loading: false,
  error: null,
  selectedMeal: null,
  mealIngredients: [],
};

const mealsSlice = createSlice({
  name: 'meals',
  initialState,
  reducers: {
    addMealIngredient(state, action: PayloadAction<Ingredient>) {
      for (const mi of state.mealIngredients) {
        if (mi.ingredient.id == action.payload.id) {
          return;
        }
      }
      state.mealIngredients = [
        ...state.mealIngredients,
        { ingredient: action.payload, quantity: 100 },
      ];
    },
    updateMealIngredient(state, action: PayloadAction<MealIngredient>) {
      state.mealIngredients.map((mi: MealIngredient) => {
        if (mi.ingredient.id == action.payload.ingredient.id) {
          mi.quantity = action.payload.quantity;
          return mi;
        }
        return mi;
      });
    },
    removeMealIngredient(state, action: PayloadAction<Number>) {
      console.log(action.payload);
      state.mealIngredients = state.mealIngredients.filter(
        (mi) => mi.ingredient.id != action.payload,
      );
    },
  },
  //   extraReducers: builder => {
  //     builder
  //       .addCase(fetchIngredients.pending, state => {
  //         state.loading = true;
  //         state.error = null;
  //       })
  //       .addCase(fetchIngredients.fulfilled, (state, action) => {
  //         state.ingredients = action.payload;
  //         state.loading = false;
  //       })
  //       .addCase(fetchIngredients.rejected, (state, action) => {
  //         state.error = action.error.message || 'Something went wrong';
  //         state.loading = false;
  //       })
  //       .addCase(addIngredient.pending, state => {
  //         state.loading = true;
  //         state.error = null;
  //       })
  //       .addCase(addIngredient.fulfilled, (state, action) => {
  //         state.loading = false;
  //         state.error = null;
  //         state.selectedIngredient = action.payload as Ingredient;
  //       })
  //       .addCase(addIngredient.rejected, (state, action) => {
  //         state.loading = false;
  //         state.error = action.error.message || 'Something went wrong';
  //       })
  //   },
});

export default mealsSlice.reducer;
export const { addMealIngredient, updateMealIngredient, removeMealIngredient } =
  mealsSlice.actions;
