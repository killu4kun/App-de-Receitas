import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import RecipeContext from '../context/RecipeContext';
import EachCard from './EachCard';

function EveryMealCard() {
  const { mealsRecipes: { meals }, searchIngredients } = useContext(RecipeContext);
  // const { ID } = useContext(RecipeContext);

  const maxResults = 12;
  if (!meals && !searchIngredients) {
    global.alert('Sinto muito, não encontramos nenhuma receita para esses filtros.');
    return <p>Nenhum resultado encontrado</p>;
  }
  const everyRecipe = Object.values(meals).slice(0, maxResults);
  const everyRecipeSearched = searchIngredients === null ? [] : searchIngredients.slice(0, maxResults);
  const everyCard = everyRecipe
    .map((recipe, index) => (
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
      </div>));

  const everyCardSearched = (everyRecipeSearched)
    .map((recipes, index) => (
      <div
        className="every-card"
        data-testid={ `${index}-recipe-card` }
        key={ index }
      >
        <Link to={ `/comidas/${recipes.idMeal}` } key={ index }>
          <EachCard
            className="each-card"
            imgsrc={ recipes.strMealThumb }
            index={ index }
            cardName={ recipes.strMeal }
            data-testid={ `${index}-recipe-card` }
          />
        </Link>
      </div>));

  if (everyCardSearched.length === 0) {
    return (
      <div
        className="div-cards"
      >
        { everyCard }
      </div>
    );
  }

  if (everyCardSearched.length > 0) {
    return (
      <div
        className="div-cards"
      >
        { everyCardSearched }
      </div>
    );
  }
}

export default EveryMealCard;
