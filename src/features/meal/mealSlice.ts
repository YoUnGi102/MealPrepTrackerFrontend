import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { Meal, MealIngredient, Ingredient, SaveOption, MealRequest } from '../../types';
import { postMeal } from './mealAPI';
import { toast } from 'react-toastify';

// export const fetchIngredients = createAsyncThunk<Ingredient[], string>(
//   'ingredients/fetchIngredients',
//   async (query: string) => {
//     const response = await getIngredients(query);
//     return response.data;
//   },
// );

export const addMeal = createAsyncThunk<Meal, MealRequest>(
  'meals/addMeal',
  async (data: MealRequest) => {
    const response = await postMeal(data);
    return response.data;
  },
);

export interface MealState {
  ingredients: Meal[];
  loading: boolean;
  error: string | null;
  selectedMeal: Meal | null;
  mealCreate: Meal;
}

const emptyMeal = {
    name: '',
    type: '',
    portions: 0,
    ingredients: [],
    saveOption: SaveOption.MEAL
}

const initialState: MealState = {
  ingredients: [],
  loading: false,
  error: null,
  selectedMeal: null,
  mealCreate: emptyMeal,
};

const mealsSlice = createSlice({
  name: 'meals',
  initialState,
  reducers: {
    clearAddMeal(state) {
      state.mealCreate = emptyMeal;
    },
    addMealIngredient(state, action: PayloadAction<Ingredient>) {
      for (const mi of state.mealCreate.ingredients) {
        if (mi.ingredient.id == action.payload.id) {
          return;
        }
      }
      state.mealCreate.ingredients = [
        ...state.mealCreate.ingredients,
        { ingredient: action.payload, quantity: 100 },
      ];
      
    },
    updateMealIngredient(state, action: PayloadAction<MealIngredient>) {
     
        state.mealCreate?.ingredients.map((mi: MealIngredient) => {
          if (mi.ingredient.id === action.payload.ingredient.id) {
            mi.quantity = action.payload.quantity;
            return mi;
          }
          return mi;
        });
      
      
    },
    removeMealIngredient(state, action: PayloadAction<number>) {

        state.mealCreate.ingredients = state.mealCreate.ingredients.filter(
          (mi) => mi.ingredient.id != action.payload,
        );
      
      
    },
  },
  extraReducers: (builder) => {
    builder
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
      .addCase(addMeal.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addMeal.fulfilled, (state, action: PayloadAction<Meal>) => {
        state.loading = false;
        state.error = null;
        state.selectedMeal = action.payload;
        state.mealCreate = emptyMeal;
        toast.success('Meal successfully added');
      })
      .addCase(addMeal.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Something went wrong';
      });
  },
});

export default mealsSlice.reducer;
export const { addMealIngredient, updateMealIngredient, removeMealIngredient } =
  mealsSlice.actions;
