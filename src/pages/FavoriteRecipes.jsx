import React, { useContext } from 'react';
import Context from '../context/RecipeContext';
import Footer from '../components/Footer';
import FavoriteRecipeCard from '../components/FavoriteRecipeCard';

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
        <h1> Favorite Recipes </h1>
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
        <Footer />
      </div>
    </div>
  );
}

export default FavoriteRecipes;
