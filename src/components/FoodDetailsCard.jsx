// os detalhes serão chamados na pagina, que faz a solicitação da API novamente para
// pegar os dados e renderizar atraves da conexão de components e o estado global
import React, { useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import {
  favoritedItem,
  handleToShareBtn,
  handleFavoritedBtn } from '../services/utilityFunctions';
import RecipeContext from '../context/RecipeContext';
import ShareIcon from '../images/shareIcon.svg';
import BlackHeart from '../images/blackHeartIcon.svg'; // incones para modificar botão de favoritos
import WhiteHeart from '../images/whiteHeartIcon.svg';

function FoodDetailCard() {
  const { recipeID, ID } = useContext(RecipeContext); // retorno da API armazenado
  const [allIngredientsMeasures, setAllIngredientsMeasures] = useState([]);
  const [recommendations, setRecommendations] = useState([]);
  const [favorited, setFavorited] = useState(false);
  const [heartChange, setHeartChange] = useState(''); // change heart logo (favorites)
  const totalIngredients = 16;
  const SIX = 6; // restrição do numero de recomendaçoes
  const history = useHistory();

  useEffect(() => {
    setFavorited(favoritedItem(ID));
  }, [heartChange]);

  useEffect(() => {
    function getIngredientsAndMeasures() {
      const ingredientsAndMeasures = [];
      for (let index = 1; index < totalIngredients; index += 1) {
        const ingredient = recipeID[`strIngredient${index}`]; // pega os resultados da api. resultados da api amarzenados em recipeId
        const measure = recipeID[`strMeasure${index}`]; // recebe a api com o id da seleção e passa estado global que retorna aqui
        if (ingredient) {
          ingredientsAndMeasures.push({ ingredient, measure });
        }
      }
      setAllIngredientsMeasures(ingredientsAndMeasures); // retorna os ingredientes e quantidades com base no id da receita selecionada
    }
    getIngredientsAndMeasures();
  }, []);

  useState(() => {
    async function fetchRecommendations() {
      const responseResult = await (await fetch('https://www.thecocktaildb.com/api/json/v1/1/search.php?s=')).json();
      setRecommendations(responseResult.drinks);
    } // api armazenada no estado de recomendaçoes
    fetchRecommendations();
  }, []); // para comidas se recomenda drinks

  function handleClick(recipe, Id, type, func) {
    handleFavoritedBtn(recipe, Id, type, func);
  }

  return (
    <div>
      <div>
        <img
          data-testid="recipe-photo"
          src={ recipeID.strMealThumb }
          alt={ recipeID.strMeal }
        />
      </div>
      <div>
        <h2 data-testid="recipe-title">{ recipeID.strMeal }</h2>
        <div>
          <button
            type="button"
            data-testid="share-btn"
            onClick={ ({ target }) => handleToShareBtn(target, ID, 'comida') }
            text="Compartilhar receita"
          >
            <img src={ ShareIcon } alt="compartilhar" />
          </button>
          <button
            type="button"
            data-testid="favorite-btn"
            onClick={ () => handleClick(recipeID, ID, 'comida', setHeartChange) }
            text="Favoritar comida"
          >
            <img src={ favorited ? BlackHeart : WhiteHeart } alt="favoritar" />
          </button>
        </div>
        <h5 data-testid="recipe-category">{ recipeID.strCategory }</h5>
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
          <h1 data-testid="0-recomendation-title">Recomendadas</h1>
          {recommendations.length > 1 ? (
            recommendations.map((recommended, index) => (
              index < SIX ? (
                <div data-testid={ `${index}-recomendation-card` } key={ index }>
                  <div>
                    <img
                      src={ recommended.strDrinkThumb }
                      alt={ recommended.strDrink }
                    />
                  </div>
                  <div>
                    <p>{ recommended.strCategory }</p>
                    <p data-testid={ `${index}-recomendation-title` }>
                      { recommended.strDrink }
                    </p>
                  </div>
                </div>
              ) : null
            ))
          ) : <p>Loading...</p>}
        </div>
        <div>
          <button
            type="button"
            data-testid="start-recipe-btn"
            onClick={ () => history.push(`/comidas/${ID}/in-progress`) }
          >
            Iniciar Receita
          </button>
        </div>
      </div>
    </div>
  );
}

export default FoodDetailCard;
