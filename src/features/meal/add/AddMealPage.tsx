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
    console.log("Updated mealIngredients:", mealIngredients);
    setTotalMacros(calculateTotalMacros(mealIngredients))
  }, [mealIngredients])

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
    
  };

  return (
    <div className="AddMealPage">
      <div className="ingredient-list">
        <h2>Meal</h2>

        <table className="meal-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Protein</th>
              <th>Fat</th>
              <th>Carbs</th>
              <th>Sugar</th>
              <th>Calories</th>
              <th></th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {mealIngredients.map((mi: MealIngredient) => (
              <tr key={mi.ingredient.id}>
                <td>{mi.ingredient.name}</td>
                <td>{mi.ingredient.protein}</td>
                <td>{mi.ingredient.fat}</td>
                <td>{mi.ingredient.carbs}</td>
                <td>{mi.ingredient.sugar}</td>
                <td>{mi.ingredient.calories}</td>
                <td>
                  <Input
                  type='number'
                    value={mi.quantity}
                    className="amount-input"
                    onChange={handleIngredientInputChange}
                    placeholder="100"
                    id={String(mi.ingredient.id)}
                  />
                  <p>g</p>
                </td>
                <td>
                  <Button
                    className={'remove-btn'}
                    variant={'destructive'}
                    onClick={handleRemoveIngredient}
                    id={String(mi.ingredient.id)}>
                    X
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
          <tfoot>
            <tr key={'total'}>
              <td colSpan={1}>
                <strong>TOTAL</strong>
              </td>
              <td>{totalMacros.protein}</td>
              <td>{totalMacros.fat}</td>
              <td>{totalMacros.carbs}</td>
              <td>{totalMacros.sugar}</td>
              <td>{totalMacros.calories}</td>
              <td colSpan={2}>
                <Button
                  className={'save-btn'}
                  variant={'destructive'}
                  onClick={handleAddMeal}>
                  Save
                </Button>
              </td>
            </tr>
          </tfoot>
        </table>
      </div>
      <div className="ingredient-search">
        <h2>Search Ingredient</h2>
        <IngredientSearchBar />
      </div>
    </div>
  );
};

export default AddMealPage;
