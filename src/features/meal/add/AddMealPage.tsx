import React, { useState, useEffect, ChangeEvent } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../../app/store';
import { Meal, MealIngredient, TotalMacros } from '../../../types';
import IngredientSearchBar from '../../../components/IngredientSearchBar';
import { addMealIngredient } from '../mealSlice';
import { Button } from '@/components/ui/button';
import { calculateTotalMacros } from '@/utils/helperFunctions';
import MealIngredientItem from '../MealIngredientItem';
import './AddMealPage.css';
import { Input } from '@/components/ui/input';
import MacroSpinner from '@/components/ui/MacroSpinner';

const AddMealPage: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const [totalMacros, setTotalMacros] = useState<TotalMacros>({
    calories: 0,
    protein: 0,
    carbs: 0,
    fat: 0,
    sugar: 0,
    quantity: 0,
  });
  const [portions, setPortions] = useState(6);
  const [name, setName] = useState('New Meal');

  const { selectedIngredient } = useSelector(
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
    const meal: Meal = {
      name,
      type: 'MEAL',
      portions,
      ingredients: mealIngredients.map((mi) => ({
        ingredientId: mi.ingredient.id,
        quantity: mi.quantity,
      })),
      image: '',
    };

    console.log(meal);
  };

  return (
    <div className="add-meal-page">

<div className="ingredient-search">
        <IngredientSearchBar />
      </div>

        <div className="ingredient-list">
          <div className="meal-name">
            <h3>Name:</h3>
            <Input
              value={name}
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                setName(e.currentTarget.value)
              }
              placeholder="New Meal"
            />
          </div>

          <div className="ingredient-list-scroll">
          <ul className="ingredient-list-ul">
            {mealIngredients.map((mi: MealIngredient) => (
              <MealIngredientItem key={mi.ingredient.id} mealIngredient={mi} />
            ))}
          </ul>
          </div>
          
          <strong className='total-label'>Total Macros</strong>
          <div className="total-macros">
            <MacroSpinner label="Protein" unit={'g'} amount={totalMacros.protein} color="#22c55e" size={70}/>
            <MacroSpinner label="Carbs" unit={'g'} amount={totalMacros.carbs} color="#3b82f6"  size={70}/>
            <MacroSpinner label="Fat" unit={'g'} amount={totalMacros.fat} color="#ef4444" size={70} />
            <MacroSpinner label="Sugar" unit={'g'}  amount={totalMacros.sugar} color="#3b82f6" size={70} />
            <MacroSpinner label="Calories" unit={'kCal'} amount={totalMacros.calories} color="#ef4444"  size={70}/>
          </div>
          
          <div className="meal-actions">
            <p>Portions:</p>
            <Input
              type="number"
              value={String(portions).replace(/^0+(?!$)/, '')}
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                setPortions(Number(e.currentTarget.value))
              }
              placeholder="6"
            />

            <Button
              className={'save-btn'}
              variant={'destructive'}
              onClick={handleAddMeal}>
              Add Meal
            </Button>
          </div>
        </div>
    </div>
  );
};

export default AddMealPage;
