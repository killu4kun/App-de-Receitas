import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import RecipeContext from '../context/RecipeContext';
import EachCard from './EachCard';

function EveryDrinkCard() {
  const { drinksRecipes: { drinks }, searchIngredients } = useContext(RecipeContext);

  const maxResults = 12;
  if (!drinks && !searchIngredients) {
    global.alert('Sinto muito, não encontramos nenhuma receita para esses filtros.');
    return <p>Nenhum resultado encontrado</p>;
  }
  const everyRecipeSearched = searchIngredients === null
    ? [] : searchIngredients.slice(0, maxResults);
  const everyRecipe = Object.values(drinks).slice(0, maxResults);
  const everyCard = everyRecipe
    .map((recipe, index) => (
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
      </div>));

  const everyCardSearched = everyRecipeSearched
    .map((recipes, index) => (
      <div
        className="every-card"
        data-testid={ `${index}-recipe-card` }
        key={ index }
      >
        <Link to={ `/bebidas/${recipes.idDrink}` } key={ index }>
          <EachCard
            className="each-card"
            imgsrc={ recipes.strDrinkThumb }
            index={ index }
            cardName={ recipes.strDrink }
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

export default EveryDrinkCard;
