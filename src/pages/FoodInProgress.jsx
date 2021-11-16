import React, { useContext, useEffect, useState } from 'react';

import { useHistory } from 'react-router';

import Button from '../components/Button';
import ListIngredients from '../components/ListIngredients';
import RecipeContext from '../context/RecipeContext';
import { handleFavoritedBtn,
  favoritedItem, handleToShareBtn } from '../services/utilityFunctions';
import ShareIcon from '../images/shareIcon.svg';
import BlackHeart from '../images/blackHeartIcon.svg'; // incones para modificar botão de favoritos
import WhiteHeart from '../images/whiteHeartIcon.svg';

function FoodInProgress() {
  const { recipeID, ID } = useContext(RecipeContext);
  const [favorited, setFavorited] = useState(false);
  const [heartChange, setHeartChange] = useState('');
  const [currentRecipe, setCurrentRecipe] = useState([]);
  const [recipeForPhoto, setRecipeForPhoto] = useState([]);
  const history = useHistory();

  useEffect(() => {
    setFavorited(favoritedItem(ID));
  }, [heartChange, ID]);

  useEffect(() => {
    setCurrentRecipe(JSON.parse(localStorage.getItem('inProgress')));
    setRecipeForPhoto(JSON.parse(localStorage.getItem('recipeID')));
  }, []);

  const recipePhoto = recipeForPhoto !== null && recipeForPhoto.length !== 0
    ? Object.values(recipeForPhoto)[0].strMealThumb : [];

  const ingredient = currentRecipe !== null && currentRecipe.length !== 0
    ? Object.values(currentRecipe)[0] : [];

  const handleFavoritedClick = (recipe, Id, type, func) => {
    handleFavoritedBtn(recipe, Id, type, func);
  };

  // text-decoration: line-through;

  return (
    <div>
      <header>
        <img
          src={ recipePhoto }
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
        <ListIngredients ingredients={ ingredient } />
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
