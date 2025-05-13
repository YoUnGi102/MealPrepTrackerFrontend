import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { Meal, MealIngredient, Ingredient, SaveOption, MealRequest } from '../../types/entities';
import { getMealsPaginated, postMeal } from './mealAPI';
import { toast } from 'react-toastify';
import { FridgeRequest } from '@/types/request/FridgeRequest';
import { initialPaginated, Paginated } from '@/types/Paginated';
import { act } from 'react';

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

export const getFridgeMeals = createAsyncThunk<Paginated<Meal>, FridgeRequest>(
  'fridge/meals',
  async (data: FridgeRequest) => {
    console.log(JSON.stringify(data));
    const response = await getMealsPaginated(`pageIndex=${data.pageIndex || 0}&pageSize=${data.pageSize || 0}`);
    return response;
  }
)

export interface MealState {
  mealsPaginated: Paginated<Meal>;
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
  mealsPaginated: {...initialPaginated},
  loading: false,
  error: null,
  selectedMeal: null,
  mealCreate: emptyMeal,
};

console.log(initialPaginated);

const mealsSlice = createSlice({
  name: 'meals',
  initialState,
  reducers: {
    clearAddMeal(state) {
      state.mealCreate = {...emptyMeal};
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
      .addCase(getFridgeMeals.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getFridgeMeals.fulfilled, (state, action) => {
        console.log(action.payload);
        state.mealsPaginated = action.payload as Paginated<Meal>;
        state.loading = false;
      })
      .addCase(getFridgeMeals.rejected, (state, action) => {
        state.error = action.error.message || 'Something went wrong';
        state.loading = false;
      })
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
