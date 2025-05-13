import React, { useState, useEffect, ChangeEvent } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../../app/store';
import { Meal, MealIngredient, MealRequest, SaveOption, TotalMacros } from '../../../types/entities';
import IngredientSearchBar from '../../../components/IngredientSearchBar';
import { addMeal, addMealIngredient } from '../mealSlice';
import { Button } from '@/components/ui/button';
import { calculateMacrosPerPortion, calculateTotalMacros } from '@/utils/helperFunctions';
import MealIngredientItem from '../MealIngredientItem';
import { Input } from '@/components/ui/input';
import NutrientIcons from '@/components/common/NutrientIcons';
import styles from './AddMealPage.module.scss';
import SelectBox, {Option} from '@/components/ui/SelectBox';

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

  const options: {label: string, value: SaveOption}[] = [
    {label: 'Save as a meal only', value: SaveOption.MEAL },
    {label: 'Save as a recipe only', value: SaveOption.RECIPE},
    {label: 'Save as a meal and recipe', value: SaveOption.MEAL_RECIPE}
  ]
  const [saveOption, setSaveOption] = useState<Option>(options[0]);

  const { selectedIngredient } = useSelector(
    (state: RootState) => state.ingredients,
  );
  const { mealCreate } = useSelector((state: RootState) => state.meals);

  console.log(mealCreate);

  useEffect(() => {
    if (selectedIngredient) {
      dispatch(addMealIngredient(selectedIngredient));
    }
  }, [selectedIngredient, dispatch]);

  useEffect(() => {
    setTotalMacros(calculateTotalMacros(mealCreate.ingredients));
  }, [mealCreate.ingredients]);

  const handleAddMeal = () => {
    const meal: MealRequest = {
      name,
      type: 'MEAL',
      portions,
      ingredients: mealCreate.ingredients.map((mi) => ({
        ingredientId: mi.ingredient.id,
        quantity: mi.quantity,
      })),
      image: '',
      saveOption: saveOption.value as SaveOption
    };

    dispatch(addMeal(meal));
  };

  return (
    <div className={styles.addMealPage}>
      <div className={styles.ingredientSearch}>
        <IngredientSearchBar />
      </div>

      <div className={styles.mealContainer}>
        <div className={styles.mealData}>
          <p>Name:</p>
          <Input
            value={name}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setName(e.currentTarget.value)
            }
            placeholder="New Meal"
          />
          <p>Portions:</p>
          <Input
            type="number"
            value={String(portions).replace(/^0+(?!$)/, '')}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setPortions(Number(e.currentTarget.value))
            }
            placeholder="6"
          />
        </div>

        <ul className={styles.ingredientList}>
          {mealCreate.ingredients.map((mi: MealIngredient) => (
            <MealIngredientItem className={styles.ingredientListItem} key={mi.ingredient.id} mealIngredient={mi} />
          ))}
        </ul>

        <strong className={styles.totalLabel}>Total Macros</strong>
        <NutrientIcons macros={totalMacros} />

        <strong className={styles.totalLabel}>Total Macros (Per portion)</strong>
        <NutrientIcons macros={calculateMacrosPerPortion(totalMacros, portions)} />

        <div className={styles.mealSaveActions}>
          
          <SelectBox
            label=""
            options={options}
            selected={saveOption}
            onChange={setSaveOption}
          />

          <Button
            className={styles.saveBtn}
            onClick={handleAddMeal}>
            Add Meal
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AddMealPage;
