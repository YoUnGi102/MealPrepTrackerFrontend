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
import MacroBar from '@/components/ui/ProgressBar';

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

  const handleIngredientInputChange = (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const id = Number(e.currentTarget.id);
    const ingredient = mealIngredients.filter((mi) => mi.ingredient.id == id)[0]
      .ingredient;
    dispatch(
      updateMealIngredient({
        ingredient,
        quantity: Number(e.currentTarget.value),
      }),
    );
  };

  const handleRemoveIngredient = (e: React.MouseEvent<HTMLButtonElement>) => {
    const id = Number(e.currentTarget.id);
    dispatch(removeMealIngredient(id));
  };

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
            <li key={mi.ingredient.id} className="ingredient-list-item">
              <div className="ingredient-header">
                <span className="ingredient-name">
                  {mi.ingredient.image ? (
                    <img
                      className="ingredient-image"
                      src={mi.ingredient.image}></img>
                  ) : (
                    <div className="ingredient-image"></div>
                  )}
                  {mi.ingredient.name}
                </span>

                <Button
                  className={'remove-btn'}
                  variant={'destructive'}
                  onClick={handleRemoveIngredient}
                  id={String(mi.ingredient.id)}>
                  X
                </Button>
              </div>

              <table className='ingredient-macros'>
                <tbody>
                    {
                        [
                            ['Protein', mi.ingredient.protein, 'green'],
                            ['Fat', mi.ingredient.fat, 'red'],
                            ['Carbs', mi.ingredient.carbs, 'blue'],
                            ['Sugar', mi.ingredient.sugar, 'black'],
                        ].map((macro) => 
                            <tr className='ingredient-macros-item' key={macro[0]}>
                                <td>{macro[0]}</td>
                                <td><MacroBar value={Number(macro[1])}/></td>
                                <td>{macro[1]}</td>
                            </tr>
                        )

                    }
                    <tr className='ingredient-macros-item'>
                        <td>Calories</td>
                        <td><MacroBar value={Number(mi.ingredient.calories)/9} color={'blue'}/></td>
                        <td>{mi.ingredient.calories}</td>
                    </tr>
                </tbody>
              </table>

              <div className="ingredient-input-remove">
                <p className="amount-label">Amount:</p>
                <Input
                  type="number"
                  value={mi.quantity}
                  className="amount-input"
                  onChange={handleIngredientInputChange}
                  placeholder="100"
                  id={String(mi.ingredient.id)}
                />
                <p style={{textAlign: 'left'}}>g</p>
              </div>
            </li>
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
