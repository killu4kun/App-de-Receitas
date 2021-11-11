import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  favoritedItem,
  handleToShareBtn,
  handleFavoritedBtn } from '../services/utilityFunctions';
import RecipeContext from '../context/RecipeContext';
import ShareIcon from '../images/shareIcon.svg';
import BlackHeart from '../images/blackHeartIcon.svg';
import WhiteHeart from '../images/whiteHeartIcon.svg';

function FoodDetailCard() {
  const { recipeID, ID } = useContext(RecipeContext);
  const [allIngredientsMeasures, setAllIngredientsMeasures] = useState([]);
  const [recommendations, setRecommendations] = useState([]);
  const [favorited, setFavorited] = useState(false);
  const [heartChange, setHeartChange] = useState('');
  const totalIngredients = 16;
  const SIX = 6; // limite de recomendaçoes

  useEffect(() => {
    setFavorited(favoritedItem(ID));
  }, [heartChange]);

  useEffect(() => {
    function getIngredientsAndMeasures() {
      const ingredientsAndMeasures = [];
      for (let index = 1; index < totalIngredients; index += 1) {
        const ingredient = recipeID[`strIngredient${index}`];
        const measure = recipeID[`strMeasure${index}`];
        if (ingredient) {
          ingredientsAndMeasures.push({ ingredient, measure });
        }
      }
      setAllIngredientsMeasures(ingredientsAndMeasures);
    }
    getIngredientsAndMeasures();
  }, []);

  useState(() => {
    async function fetchRecommendations() {
      const responseResult = await (await fetch('https://www.themealdb.com/api/json/v1/1/search.php?s=')).json();
      setRecommendations(responseResult.meals); // armazena a api no estado recommendations
    }
    fetchRecommendations();
  }, []);

  function handleClick(recipe, Id, type, func) {
    handleFavoritedBtn(recipe, Id, type, func);
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
            dataTest="share-btn"
            onClick={ ({ target }) => handleToShareBtn(target, ID, 'bebidas') }
            text="Compartilhar receita"
          >
            <img src={ ShareIcon } alt="compartilhar" />
          </button>
          <button
            type="button"
            dataTest="favorite-btn"
            onClick={ () => handleClick(recipeID, ID, 'bebidas', setHeartChange) }
            text="Favoritar comida"
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
          {recommendations.length > 1 ? (
            recommendations.map((recommended, index) => (
              index < SIX ? (
                <div data-testid={ `${index}-recomendation-card` } key={ index }>
                  <div>
                    <img
                      src={ recommended.strMealThumb }
                      alt={ recommended.strMeal }
                    />
                  </div>
                  <div>
                    <p>{ recommended.strCategory }</p>
                    <p>{ recommended.strMeal }</p>
                  </div>
                </div>
              ) : null
            ))
          ) : <p>Loading...</p>}
        </div>
        <div>
          <Link to={ `/bebidas/${ID}/in-progress` }>
            <button
              type="button"
              data-testid="start-recipe-btn"
            >
              Iniciar Receita
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default FoodDetailCard;
