import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchIngredients, setSelectedIngredient } from '../features/ingredients/ingredientsSlice';
import { Ingredient } from '../types';
import { RootState } from '../app/store';
import './IngredientSearchBar.css';

const IngredientSearchBar: React.FC = () => {
  const dispatch = useDispatch();
  const [searchQuery, setSearchQuery] = useState('');
  const [showSuggestions, setShowSuggestions] = useState(false);

  const { ingredients, loading } = useSelector((state: RootState) => state.ingredients);

  console.log(ingredients);

  useEffect(() => {
    const debounce = setTimeout(() => {
      if (searchQuery) {
        dispatch(fetchIngredients(searchQuery));
        setShowSuggestions(true);
      } else {
        setShowSuggestions(false);
      }
    }, 300);

    return () => clearTimeout(debounce);
  }, [searchQuery, dispatch]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const handleSelect = (ingredient: Ingredient) => {
    dispatch(setSelectedIngredient(ingredient));
    setSearchQuery(ingredient.name);
    setShowSuggestions(false);
  };

  return (
    <div style={{ position: 'relative' }}>
      <input
        className="search-input"
        type="text"
        value={searchQuery}
        onChange={handleSearchChange}
        placeholder="Search for an ingredient..."
        autoComplete="off"
      />
      {loading && <p className="loading">Loading...</p>}

      {showSuggestions && ingredients.length > 0 && (
        <ul className="suggestions-list">
          {ingredients.map(ingredient => {
            const calories = ingredient.protein * 4 + ingredient.carbs * 4 + ingredient.fat * 9;
            return (
              <li
                className="suggestions-item"
                key={ingredient.id}
                onClick={() => handleSelect(ingredient)}
                style={{
                  padding: '0.5rem',
                  borderBottom: '1px solid #eee',
                  cursor: 'pointer',
                }}
              >
                <div style={{ fontWeight: 'bold' }}>{ingredient.name}</div>
                <div style={{ fontSize: '0.85rem', color: '#555' }}>
                  Protein: {ingredient.protein}g | Carbs: {ingredient.carbs}g | Fat:{' '}
                  {ingredient.fat}g | Calories: {calories.toFixed(0)}
                </div>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
};

export default IngredientSearchBar;
