// MealIngredientItem.tsx
import React from 'react';
import { MealIngredient } from '@/types';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import MacroBar from '@/components/ui/MacroBar';
import { removeMealIngredient, updateMealIngredient } from './mealSlice';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '@/app/store';

interface Props {
  mealIngredient: MealIngredient;
}

const MealIngredientItem: React.FC<Props> = ({ mealIngredient }) => {
  
    const dispatch = useDispatch<AppDispatch>();
    
  const { mealIngredients } = useSelector((state: RootState) => state.meals);

      const handleIngredientInputChange = (
        e: React.ChangeEvent<HTMLInputElement>,
      ) => {
        const id = Number(e.currentTarget.id);
        const ingredient = mealIngredients.filter((mi) => mealIngredient.ingredient.id == id)[0]
          .ingredient;
        dispatch(
          updateMealIngredient({
            ingredient,
            quantity: Number(e.currentTarget.value),
          }),
        );
      };
    
      const handleRemoveIngredient = (id: number) => {
        dispatch(removeMealIngredient(id));
      };
  
    return (
    <li className="ingredient-list-item">
      <div className="ingredient-header">
        <span className="ingredient-name">
          {mealIngredient.ingredient.image ? (
            <img className="ingredient-image" src={mealIngredient.ingredient.image} alt={mealIngredient.ingredient.name} />
          ) : (
            <div className="ingredient-image"></div>
          )}
          {mealIngredient.ingredient.name}
        </span>

        <Button
          className="remove-btn"
          variant="destructive"
          onClick={() => handleRemoveIngredient(mealIngredient.ingredient.id)}
        >
          X
        </Button>
      </div>

      <table className="ingredient-macros">
        <tbody>
          {[
            ['Protein', mealIngredient.ingredient.protein, 'green'],
            ['Fat', mealIngredient.ingredient.fat, 'red'],
            ['Carbs', mealIngredient.ingredient.carbs, 'blue'],
            ['Sugar', mealIngredient.ingredient.sugar, 'black'],
          ].map(([label, value, color]) => (
            <tr className="ingredient-macros-item" key={label}>
              <td>{label}</td>
              <td><MacroBar value={Number(value)} color={color as string} /></td>
              <td>{value}</td>
            </tr>
          ))}
          <tr className="ingredient-macros-item">
            <td>Calories</td>
            <td><MacroBar value={Number(mealIngredient.ingredient.calories) / 9} color="blue" /></td>
            <td>{mealIngredient.ingredient.calories}</td>
          </tr>
        </tbody>
      </table>

      <div className="ingredient-input-remove">
        <p className="amount-label">Amount:</p>
        <Input
          type="number"
          value={mealIngredient.quantity}
          className="amount-input"
          onChange={handleIngredientInputChange}
          placeholder="100"
          id={String(mealIngredient.ingredient.id)}
        />
        <p style={{ textAlign: 'left' }}>g</p>
      </div>
    </li>
  );
};

export default MealIngredientItem;
