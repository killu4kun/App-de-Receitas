import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import RecipeContext from '../context/RecipeContext';
import EachCard from './EachCard';

function EveryDrinkCard() {
  const { drinksRecipes: { drinks }, searchIngredients,
    filteredCategory } = useContext(RecipeContext);
  const maxResults = 12;
  if (searchIngredients === null || searchIngredients === undefined) {
    return global
      .alert('Sinto muito, não encontramos nenhuma receita para esses filtros.');
  }
  const everyRecipeSearched = Object.values(searchIngredients).slice(0, maxResults);
  const everyRecipeByCategory = filteredCategory === null || filteredCategory.length === 0
    ? [] : (filteredCategory).slice(0, maxResults);
  const everyRecipe = Object.values(drinks).slice(0, maxResults);
  console.log(('abc'), everyRecipe);
  const mapingCards = (param) => (
    param.map((recipe, index) => (
      <div
        className="every-card"
        data-testid={ `${index}-recipe-card` }
        key={ index }
      >
        <Link to={ `/bebidas/${recipe.idDrink}` } key={ index }>
          <EachCard
            className="each-card"
            imgsrc={ recipe.strDrinkThumb }
            index={ index }
            cardName={ recipe.strDrink }
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

export default EveryDrinkCard;
