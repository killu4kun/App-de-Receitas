import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import RecipeContext from '../context/RecipeContext';
import EachCard from './EachCard';

function EveryDrinkCard() {
  const { drinksRecipes: { drinks } } = useContext(RecipeContext);

  const maxResults = 12;
  if (!drinks) {
    global.alert('Sinto muito, não encontramos nenhuma receita para esses filtros.');
    return <p>Nenhum resultado encontrado</p>;
  }
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
  return (
    <div
      className="div-cards"
    >
      { everyCard }
    </div>
  );
}

export default EveryDrinkCard;
