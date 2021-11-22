import React, { useContext } from 'react';
import Header from '../components/Header';
import RecipeContext from '../context/RecipeContext';
import DoneRecipeCards from '../components/DoneRecipeCard';

function DoneRecipes() {
  const { setDoneRecipesFilter } = useContext(RecipeContext);
  // nesta pagina iremos definir o valor(estado) do filtro das receitas prontas
  // para passar para os cards e assim renderizar o que é desejado
  // ao receber o estado do filtro os cards renderizados serao de acordo com ele

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
      <Header title="Receitas Feitas" showSearch={ false } />
      <h1> DoneRecipese </h1>
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
      <DoneRecipeCards />
    </div>
  );
}

export default DoneRecipes;
