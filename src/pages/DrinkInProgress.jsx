import React, { useCallback, useContext, useEffect, useState } from 'react';

import { useLocation } from 'react-router';
import RecipeContext from '../context/RecipeContext';
import { handleFavoritedBtn,
  favoritedItem, handleToShareBtn } from '../services/utilityFunctions';
import ShareIcon from '../images/shareIcon.svg';
import BlackHeart from '../images/blackHeartIcon.svg'; // incones para modificar botão de favoritos
import WhiteHeart from '../images/whiteHeartIcon.svg';
import ListIngredientsDrink from '../components/ListIngredientsDrinks';

const totalIngredients = 16;
const BASE_URL = 'https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=';

function FoodInProgress() {
  const { recipeID } = useContext(RecipeContext);
  const [favorited, setFavorited] = useState(false);
  const [allIngredientsMeasures, setAllIngredientsMeasures] = useState([]);
  const [heartChange, setHeartChange] = useState('');
  const [currentRecipe, setCurrentRecipe] = useState({});
  const { pathname } = useLocation();
  const regex = /\d+/g;
  const [locationID] = pathname.match(regex);

  useEffect(() => {
    setFavorited(favoritedItem(locationID));
  }, [heartChange, locationID]);

  const recipe = useCallback(async () => {
    const response = await fetch(
      `${BASE_URL}${locationID}`,
    );
    const { drinks } = await response.json();
    setCurrentRecipe(drinks[0]);
  }, [locationID]);

  useEffect(() => {
    recipe();
  }, [recipe]);

  useEffect(() => {
    function getIngredientsAndMeasures() {
      const ingredientsAndMeasures = [];
      for (let index = 1; index < totalIngredients; index += 1) {
        const ingredient = currentRecipe[`strIngredient${index}`]; // pega os resultados da api. resultados da api amarzenados em recipeId
        const measure = currentRecipe[`strMeasure${index}`]; // recebe a api com o id da seleção e passa estado global que retorna aqui
        if (ingredient) {
          ingredientsAndMeasures.push({ ingredient, measure });
        }
      }
      setAllIngredientsMeasures(ingredientsAndMeasures); // retorna os ingredientes e quantidades com base no id da receita selecionada
    }
    getIngredientsAndMeasures();
  }, [currentRecipe]);
  const ingredients = allIngredientsMeasures.map(({ ingredient }) => ingredient);

  const handleFavoritedClick = (recipes, Id, type, func) => {
    handleFavoritedBtn(recipes, Id, type, func);
  };

  const renderPage = () => (
    <>
      <header>
        <img
          src={ currentRecipe.strDrinkThumb }
          data-testid="recipe-photo"
          alt="comida em progresso"
        />
        <h1 data-testid="recipe-title">
          { `Prato: ${currentRecipe.strDrink}` }
        </h1>
      </header>
      <main>
        <h4 data-testid="recipe-category">
          { `Categoria da receita: ${currentRecipe.strCategory}` }
        </h4>
        <div>
          <button
            type="button"
            data-testid="share-btn"
            onClick={ ({ target }) => handleToShareBtn(target, locationID, 'bebida') }
            text="Compartilhar receita"
          >
            <img src={ ShareIcon } alt="compartilhar" />
          </button>
          <button
            type="button"
            data-testid="favorite-btn"
            onClick={ () => handleFavoritedClick(recipeID, locationID,
              'bebida', setHeartChange) }
            text="Favoritar comida"
          >
            <img src={ favorited ? BlackHeart : WhiteHeart } alt="favoritar" />
          </button>
        </div>
        <h4 data-testid="instructions">Instruções de preparo</h4>
        <ListIngredientsDrink
          recipeForLocalStorage={ currentRecipe }
          ingredients={ ingredients }
        />
      </main>
    </>
  );
  // text-decoration: line-through;
  console.log(currentRecipe);
  return (
    <div>
      {Object.values(currentRecipe).length === 0
        ? <span>Loading....</span>
        : renderPage()}
    </div>
  );
}

export default FoodInProgress;
