import React, { useContext } from 'react';
import Context from '../context/RecipeContext';
import FavoriteRecipeCard from '../components/FavoriteRecipeCard';
import Header from '../components/Header';

function FavoriteRecipes() {
  const { setDoneRecipesFilter } = useContext(Context);

  function filterByFood() {
    setDoneRecipesFilter('bebida');
  }

  function filterByDrink() {
    setDoneRecipesFilter('comida');
  }

  function filterByAll() {
    setDoneRecipesFilter('');
  }

  return (
    <div>
      <div>
        <Header title="Receitas Favoritas" showSearch={ false } />
        <button
          type="button"
          data-testid="filter-by-all-btn"
          onClick={ filterByAll }
        >
          Todos
        </button>
        <button
          type="button"
          data-testid="filter-by-food-btn"
          onClick={ filterByFood }
        >
          Comidas
        </button>
        <button
          type="button"
          data-testid="filter-by-drink-btn"
          onClick={ filterByDrink }
        >
          Drinks
        </button>
        <FavoriteRecipeCard />
      </div>
    </div>
  );
}

export default FavoriteRecipes;
