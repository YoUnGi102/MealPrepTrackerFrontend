import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../../app/store';
import { Ingredient, MealIngredient } from '../../../types';
import IngredientSearchBar from '../../../components/IngredientSearchBar';
import { Input } from '@/components/ui/input';
import './AddMealPage.css';
import {
  addMealIngredient,
  removeMealIngredient,
  updateMealIngredient,
} from '../mealSlice';
import { Button } from '@/components/ui/button';
import { calculateTotalMacros } from '@/utils/helperFunctions';
import Slider, { ReadonlySlider } from '@/components/ui/slider';
import MacroBar from '@/components/ui/MacroBar';
import MealIngredientItem from '../MealIngredientItem';

const AddMealPage: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const [selectedIngredients, setSelectedIngredients] = useState<
    { ingredient: Ingredient; amount: number }[]
  >([]);
  const [totalMacros, setTotalMacros] = useState({
    calories: 0,
    protein: 0,
    carbs: 0,
    fat: 0,
    sugar: 0,
  });

  const { ingredients, loading, selectedIngredient } = useSelector(
    (state: RootState) => state.ingredients,
  );
  const { mealIngredients } = useSelector((state: RootState) => state.meals);

  useEffect(() => {
    if (selectedIngredient) {
      dispatch(addMealIngredient(selectedIngredient));
    }
  }, [selectedIngredient]);

  useEffect(() => {
    setTotalMacros(calculateTotalMacros(mealIngredients));
  }, [mealIngredients]);


  const handleAddMeal = () => {
    // Add logic for saving the meal if needed
  };

  return (
    <div className="add-meal-page">
      <div className="ingredient-list">
        <h2>Meal</h2>

        {/* List view for meal ingredients */}
        <ul className="ingredient-list-ul">
          {mealIngredients.map((mi: MealIngredient) => (
           <MealIngredientItem mealIngredient={mi}/>
          ))}
        </ul>

        {/* Total macros at the bottom */}
        <div className="total-macros">
          <strong>TOTAL</strong>
          <span>Protein: {totalMacros.protein}g</span>
          <span>Fat: {totalMacros.fat}g</span>
          <span>Carbs: {totalMacros.carbs}g</span>
          <span>Sugar: {totalMacros.sugar}g</span>
          <span>Calories: {totalMacros.calories}</span>

          <Button
            className={'save-btn'}
            variant={'destructive'}
            onClick={handleAddMeal}>
            Save
          </Button>
        </div>
      </div>

      <div className="ingredient-search">
        <h2>Search Ingredient</h2>
        <IngredientSearchBar />
      </div>
    </div>
  );
};

export default AddMealPage;
