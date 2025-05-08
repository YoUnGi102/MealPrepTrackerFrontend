import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../app/store';
import IngredientSearchBar from '../../components/IngredientSearchBar';
import AddIngredientModal from './add/AddIngredientModal';
import './IngredientsPage.css';

const IngredientsPage: React.FC = () => {
  const { selectedIngredient } = useSelector(
    (state: RootState) => state.ingredients,
  );

  return (
    <div>
      <IngredientSearchBar />

      {selectedIngredient && (
        <div className={'IngredientView'}>
          <h2>Selected Ingredient</h2>
          {selectedIngredient.image && (
            <img
              src={selectedIngredient.image}
              alt={selectedIngredient.name}
              width="80"
            />
          )}
          <div>{selectedIngredient.name}</div>
          <div>Type: {selectedIngredient.type}</div>
          <div>Protein: {selectedIngredient.protein}g</div>
          <div>Fat: {selectedIngredient.fat}g</div>
          <div>Carbs: {selectedIngredient.carbs}g</div>
          <div>Sugar: {selectedIngredient.sugar}g</div>
        </div>
      )}

      <AddIngredientModal />
    </div>
  );
};

export default IngredientsPage;
