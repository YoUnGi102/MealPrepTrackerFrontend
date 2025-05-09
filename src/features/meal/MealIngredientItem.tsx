// MealIngredientItem.tsx
import React from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import MacroBar from '@/components/ui/MacroBar';
import { removeMealIngredient, updateMealIngredient } from './mealSlice';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '@/app/store';
import './MealIngredientItem.css';
import NutrientIcons from '@/components/common/NutrientIcons';
import clsx from 'clsx';

interface Props {
  mealIngredient: {
    ingredient: {
      id: number;
      protein: number;
      fat: number;
      carbs: number;
      sugar: number;
      calories: number;
      name: string;
      image?: string;
    };
    quantity: number;
  };
  className?: string;
}

const MealIngredientItem: React.FC<Props> = ({ mealIngredient, className }) => {
  const dispatch = useDispatch<AppDispatch>();

  const { ingredients } = useSelector((state: RootState) => state.meals.mealCreate);

  const handleIngredientInputChange = (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const id = Number(e.currentTarget.id);
    const ingredient = ingredients.filter(
      (mi) => mi.ingredient.id === id,
    )[0].ingredient;
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
    <div className={clsx("ingredient-item", className)} >
      <div className="ingredient-header">
        <span className="ingredient-name">
          {mealIngredient.ingredient.image ? (
            <img
              className="ingredient-image"
              src={mealIngredient.ingredient.image}
              alt={mealIngredient.ingredient.name}
            />
          ) : (
            <div className="ingredient-image"></div>
          )}
          {mealIngredient.ingredient.name}
        </span>

        <Button
          className="remove-btn"
          variant="destructive"
          onClick={() =>
            handleRemoveIngredient(mealIngredient.ingredient.id || 0)
          }>
          X
        </Button>
      </div>

      <NutrientIcons macros={mealIngredient.ingredient} />

      {/* <table className="ingredient-macros">
        <tbody>
          {[
            ['Protein', mealIngredient.ingredient.protein, 'green'],
            ['Fat', mealIngredient.ingredient.fat, 'green'],
            ['Carbs', mealIngredient.ingredient.carbs, 'green'],
            ['Sugar', mealIngredient.ingredient.sugar, 'green'],
            ['Calories', mealIngredient.ingredient.calories, 'blue'],
          ].map(([label, value, color]) => (
            <tr className="ingredient-macros-item" key={label}>
              <td>{label}</td>
              <td>
                <MacroBar
                  value={Number(
                    label != 'Calories' ? value : Math.round(Number(value) / 9),
                  )}
                  color={color as string}
                />
              </td>
              <td>{`${value} ${label != 'Calories' ? ' g' : ' kCal'}`}</td>
            </tr>
          ))}
        </tbody>
      </table> */}

      <div className="ingredient-actions">
        <p className="amount-label">Amount:</p>
        <Input
          type="number"
          value={String(mealIngredient.quantity).replace(/^0+(?!$)/, '')}
          className="amount-input"
          onChange={handleIngredientInputChange}
          placeholder="100"
          id={String(mealIngredient.ingredient.id)}
        />
        <p style={{ textAlign: 'left' }}>g</p>
      </div>
    </div>
  );
};

export default MealIngredientItem;
