import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import RecipeContext from '../context/RecipeContext';
import EachCard from './EachCard';

function EveryMealCard() {
  const { mealsRecipes: { meals }, searchIngredients,
    filteredCategory } = useContext(RecipeContext);

  const maxResults = 12;
  if (searchIngredients === null || searchIngredients === undefined) {
    return global
      .alert('Sinto muito, não encontramos nenhuma receita para esses filtros.');
  }
  const everyRecipe = Object.values(meals).slice(0, maxResults);
  const everyRecipeSearched = (searchIngredients).slice(0, maxResults);
  const everyRecipeByCategory = filteredCategory === null || filteredCategory.length === 0
    ? [] : (filteredCategory).slice(0, maxResults);
  console.log(('filteredCategory'), filteredCategory);
  console.log(('meals'), meals);
  console.log(('searched'), everyRecipeSearched);
  const mapingCards = (param) => (
    param.map((recipe, index) => (
      <div
        className="every-card"
        data-testid={ `${index}-recipe-card` }
        key={ index }
      >
        <Link to={ `/comidas/${recipe.idMeal}` } key={ index }>
          <EachCard
            className="each-card"
            imgsrc={ recipe.strMealThumb }
            index={ index }
            cardName={ recipe.strMeal }
            data-testid={ `${index}-recipe-card` }
          />
        </Link>
      </div>))
  );

  if (everyRecipeSearched.length > 0) {
    return (
      <div
        className="div-cards"
      >
        { mapingCards(everyRecipeSearched) }
      </div>
    );
  }

  if (everyRecipeByCategory.length > 0) {
    return (
      <div
        className="div-cards"
      >
        { mapingCards(everyRecipeByCategory) }
      </div>
    );
  }
  return (
    <div
      className="div-cards"
    >
      { mapingCards(everyRecipe) }
    </div>
  );
}

export default EveryMealCard;
