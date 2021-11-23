import React, { useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
// import { isArray } from 'lodash-es';
import { Carousel, Spinner } from 'react-bootstrap';
import {
  favoritedItem,
  handleToShareBtn,
  handleFavoritedBtn } from '../services/utilityFunctions';
import RecipeContext from '../context/RecipeContext';
import ShareIcon from '../images/shareIcon.svg';
import BlackHeart from '../images/blackHeartIcon.svg';
import WhiteHeart from '../images/whiteHeartIcon.svg';

const totalIngredients = 16;
function getIngredientsAndMeasures(compare, callback) {
  const ingredientsAndMeasures = [];
  for (let index = 1; index < totalIngredients; index += 1) {
    const ingredient = compare[`strIngredient${index}`];
    const measure = compare[`strMeasure${index}`];
    if (ingredient) {
      ingredientsAndMeasures.push({ ingredient, measure });
    }
  }
  callback(ingredientsAndMeasures);
}

function DrinkDetailsCard() {
  const { recipeID, ID } = useContext(RecipeContext);
  const [allIngredientsMeasures, setAllIngredientsMeasures] = useState([]);
  const [recommendations, setRecommendations] = useState([]);
  const [favorited, setFavorited] = useState(false);
  const [heartChange, setHeartChange] = useState('');
  const SIX = 6; // limite de recomendaçoes
  const history = useHistory();
  const [text, setText] = useState('Iniciar Receita');

  useEffect(() => {
    function setStartOrContinue() {
      const inProgress = localStorage.getItem('inProgressRecipes') !== null
      && localStorage.getItem('inProgress')
      !== undefined ? localStorage.getItem('inProgressRecipes') : '';
      const seven = 21;
      const fifteen = 15;
      // const regex = /\b\d{5-6}\b/g;
      // const json = inProgress.match(regex);

      const json = inProgress.slice(fifteen, seven);
      console.log(json);
      if (json === ID) {
        setText('Continuar Receita');
        console.log(json);
      }
    }
    setStartOrContinue();
  }, [ID]);

  useEffect(() => {
    setFavorited(favoritedItem(ID));
  }, [heartChange]);

  useEffect(() => {
    getIngredientsAndMeasures(recipeID, setAllIngredientsMeasures);
  }, []);

  useState(() => {
    async function fetchRecommendations() {
      const responseResult = await (await fetch('https://www.themealdb.com/api/json/v1/1/search.php?s=')).json();
      setRecommendations(responseResult.meals); // armazena a api no estado recommendations
    }
    fetchRecommendations();
  }, []);

  function handleStartRecipe() {
    const ingredients = allIngredientsMeasures.map(({ ingredient }) => ingredient);
    const cocktails = {
      [ID]: ingredients,
    };
    // const recipePhoto = {
    //   recipeID,
    // };
    localStorage.setItem('inProgress', JSON.stringify(cocktails));
    // localStorage.setItem('recipeID', JSON.stringify(recipePhoto));
    history.push(`/bebidas/${ID}/in-progress`);
  }

  return (
    <div>
      <div>
        <img
          data-testid="recipe-photo"
          src={ recipeID.strDrinkThumb }
          alt={ recipeID.strDrink }
        />
      </div>
      <div>
        <h2 data-testid="recipe-title">{ recipeID.strDrink }</h2>
        <div>
          <button
            type="button"
            data-testid="share-btn"
            onClick={ ({ target }) => handleToShareBtn(target, ID, 'bebida') }
            text="Compartilhar receita"
          >
            <img src={ ShareIcon } alt="compartilhar" />
          </button>
          <button
            type="button"
            data-testid="favorite-btn"
            onClick={ () => handleFavoritedBtn(recipeID, ID, 'bebida', setHeartChange) }
            text="Favoritar bebida"
            src={ favorited ? BlackHeart : WhiteHeart }
            alt="favoritar"
          >
            <img src={ favorited ? BlackHeart : WhiteHeart } alt="favoritar" />
          </button>
        </div>
        <h5 data-testid="recipe-category">{ recipeID.strAlcoholic }</h5>
        <div />
        <div>
          {allIngredientsMeasures.length >= 1 ? (
            allIngredientsMeasures.map((ingredient, index) => (
              <div key={ index }>
                <p data-testid={ `${index}-ingredient-name-and-measure` }>
                  { `${ingredient.ingredient} - ${ingredient.measure}` }
                </p>
              </div>
            ))
          ) : <p>Loading...</p>}
        </div>
        <div>
          <p data-testid="instructions">
            {recipeID.strInstructions}
          </p>
        </div>
        <div>
          <p data-testid="video">video</p>
        </div>
        <div>
          <h2 data-testid="0-recomendation-title">Recomendadas</h2>
          <Carousel
            fade
            className="d-block w-100"
          >
            {recommendations.length > 1 ? (
              recommendations.map((recommended, index) => (
                index < SIX ? (
                  <Carousel.Item
                    data-testid={ `${index}-recomendation-card` }
                    key={ index }
                  >
                    <img
                      className="d-block w-100"
                      src={ recommended.strMealThumb }
                      alt={ recommended.strMeal }
                    />
                    <Carousel.Caption>
                      <h3>{ recommended.strCategory }</h3>
                      <p data-testid={ `${index}-recomendation-title` }>
                        { recommended.strMeal }
                      </p>
                    </Carousel.Caption>
                  </Carousel.Item>
                ) : null
              ))
            ) : <Spinner animation="grow" variant="warning">Loading...</Spinner>}
          </Carousel>
        </div>
        <div>
          <button
            type="button"
            className="btn-start-recipe"
            style={ { position: 'fixed' } }
            data-testid="start-recipe-btn"
            onClick={ () => handleStartRecipe() }
          >
            { text }
          </button>
        </div>
      </div>
    </div>
  );
}

export default DrinkDetailsCard;
