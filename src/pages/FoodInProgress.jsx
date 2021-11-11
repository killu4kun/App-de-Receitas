import React, { useContext, useEffect, useState } from 'react';

import { useHistory } from 'react-router';

import Button from '../components/Button';
import ListIngredients from '../components/ListIngredients';
import RecipeContext from '../context/RecipeContext';
import { handleFavoritedBtn, favoritedItem, handleToShareBtn } from '../services/utilityFunctions';
import ShareIcon from '../images/shareIcon.svg';
import BlackHeart from '../images/blackHeartIcon.svg'; // incones para modificar botão de favoritos
import WhiteHeart from '../images/whiteHeartIcon.svg';

function FoodInProgress() {
  const history = useHistory();
  const [favorited, setFavorited] = useState(false);
  const { recipeInProgress, recipeID, ID } = useContext(RecipeContext);
  const [heartChange, setHeartChange] = useState('');
  console.log(recipeInProgress)
  const copy = require('clipboard-copy');
  const handleClick = () => {
    copy('Favoritar receita')
  }
   useEffect(() => {
    setFavorited(favoritedItem(ID));
  }, [heartChange]);

  const handleFavoritedClick = (recipe, Id, type, func) => {
    handleFavoritedBtn(recipe, Id, type, func);
  }

  return (
    <div>
      <header>
        <img
          src={ recipeID.strMealThumb }
          data-testid="recipe-photo"
          alt="comida em progresso"
        />
        <h1 data-testid="recipe-title"> Comida em progresso </h1>
      </header>
      <main>
        <h4 data-testid="recipe-category">categoria da receita</h4>
        <div>
          <button
            type="button"
            data-testid="share-btn"
            onClick={ ({ target }) => handleToShareBtn(target, ID, 'comidas') }
            text="Compartilhar receita"
          >
            <img src={ ShareIcon } alt="compartilhar" />
          </button>
          <button
            type="button"
            data-testid="favorite-btn"
            onClick={ () => handleFavoritedClick(recipeID, ID, 'comida', setHeartChange) }
            text="Favoritar comida"
          >
            <img src={ favorited ? BlackHeart : WhiteHeart } alt="favoritar" />
          </button>
        </div>
        <h4 data-testid="instructions">Instruções de preparo</h4>
        <ListIngredients ingredients={ recipeInProgress } />
      </main>
      <footer>
        <Button
          text="Finalizar receita"
          dataTestId="finish-recipe-btn"
          onClick={ () => history.push('/receitas-feitas') }
        />
      </footer>
    </div>
  );
}

export default FoodInProgress;
