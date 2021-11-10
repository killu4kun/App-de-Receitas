import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import RecipeContext from '../context/RecipeContext';
import EachCard from './EachCard';

function EveryMealCard() {
  const { mealsRecipes: { meals } } = useContext(RecipeContext);

  const maxResults = 12;
  if (!meals) {
    global.alert('Sinto muito, não encontramos nenhuma receita para esses filtros.');
    return <p>Nenhum resultado encontrado</p>;
  }
  const everyRecipe = Object.values(meals).slice(0, maxResults);
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
  return (
    <div
      className="div-cards"
    >
      { everyCard }
    </div>
  );
}

export default EveryMealCard;
