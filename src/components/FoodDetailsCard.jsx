// os detalhes serão chamados na pagina, que faz a solicitação da API novamente para
// pegar os dados e renderizar atraves da conexão de components e o estado global
import React, { useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Card,
  Carousel,
  Button,
  ListGroup,
  Spinner } from 'react-bootstrap';
import {
  favoritedItem,
  handleToShareBtn,
  handleFavoritedBtn,
} from '../services/utilityFunctions';
import RecipeContext from '../context/RecipeContext';
import ShareIcon from '../images/shareIcon.svg';
import BlackHeart from '../images/blackHeartIcon.svg'; // incones para modificar botão de favoritos
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

function FoodDetailCard() {
  const { recipeID, ID } = useContext(RecipeContext); // retorno da API armazenado
  const [allIngredientsMeasures, setAllIngredientsMeasures] = useState([]);
  const [recommendations, setRecommendations] = useState([]);
  const [favorited, setFavorited] = useState(false);
  const [heartChange, setHeartChange] = useState(''); // change heart logo (favorites)
  // const [mealsOfLocalStorage, setMealsOfLocalStorage] = useState({});
  const [text, setText] = useState('Iniciar Receita');
  const SIX = 6; // restrição do numero de recomendaçoes
  const history = useHistory();

  useEffect(() => {
    setFavorited(favoritedItem(ID));
  }, [heartChange]);

  // useEffect(() => {
  //   const meals = localStorage.getItem('meals') !== null
  //     ? localStorage.getItem('meals') : {};
  //     console.log(meals)
  //   setMealsOfLocalStorage(meals);
  // }, []);

  useEffect(() => {
    function setStartOrContinue() {
      const inProgress = localStorage.getItem('inProgressRecipes') !== null
       && localStorage.getItem('inProgress')
      !== undefined ? localStorage.getItem('inProgressRecipes') : '';
      const sixteen = 16;
      const eleven = 11;
      const json = inProgress.slice(eleven, sixteen);
      console.log(json);
      if (json === ID) {
        setText('Continuar Receita');
        console.log(json);
      }
    }
    setStartOrContinue();
  }, [ID]);

  useEffect(() => {
    getIngredientsAndMeasures(recipeID, setAllIngredientsMeasures);
  }, []);

  useState(() => {
    async function fetchRecommendations() {
      const responseResult = await (await fetch('https://www.thecocktaildb.com/api/json/v1/1/search.php?s=')).json();
      setRecommendations(responseResult.drinks);
    } // api armazenada no estado de recomendaçoes
    fetchRecommendations();
  }, []); // para comidas se recomenda drinks

  function handleStartRecipe() {
    const ingredients = allIngredientsMeasures.map(({ ingredient }) => ingredient);
    const meals = {
      [ID]: ingredients,
    };
    const recipePhoto = {
      recipeID,
    };
    localStorage.setItem('inProgress', JSON.stringify(meals));
    localStorage.setItem('recipeID', JSON.stringify(recipePhoto));
    history.push(`/comidas/${ID}/in-progress`);
  }

  return (
    <Card className="container-fluid">
      <img
        className="img-fluid"
        data-testid="recipe-photo"
        src={ recipeID.strMealThumb }
        alt={ recipeID.strMeal }
      />
      <section className="d-block pt-3 justify-content-center">
        <h6 className="align-center">Hoje vamos preparar: </h6>
        <h2 data-testid="recipe-title">{ recipeID.strMeal }</h2>
        <h6 className="" data-testid="recipe-category">
          <small className="text-muted">Categoria:</small>
          {' '}
          { recipeID.strCategory }
        </h6>
        <div className="d-flex justify-content-end">
          <Button
            variant="light"
            type="button"
            data-testid="share-btn"
            onClick={ ({ target }) => handleToShareBtn(target, ID, 'comida') }
            text="Compartilhar receita"
          >
            <img src={ ShareIcon } alt="compartilhar" />
          </Button>
          <Button
            variant="light"
            style={ { cursor: 'pointer' } }
            type="button"
            data-testid="favorite-btn"
            onClick={ () => handleFavoritedBtn(recipeID, ID, 'comida', setHeartChange) }
            text="Favoritar comida"
            src={ favorited ? BlackHeart : WhiteHeart }
            alt="favoritar"
          >
            <img src={ favorited ? BlackHeart : WhiteHeart } alt="favoritar" />
          </Button>
        </div>
        <section>
          {allIngredientsMeasures.length >= 1 ? (
            allIngredientsMeasures.map((ingredient, index) => (
              <ListGroup variant="flush" key={ index }>
                <ListGroup.Item data-testid={ `${index}-ingredient-name-and-measure` }>
                  { `${ingredient.ingredient} - ${ingredient.measure}` }
                </ListGroup.Item>
              </ListGroup>
            ))
          ) : <Spinner animation="grow" variant="warning">Loading...</Spinner>}
        </section>
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
                      src={ recommended.strDrinkThumb }
                      alt={ recommended.strDrink }
                    />
                    <Carousel.Caption>
                      <h3>{ recommended.strCategory }</h3>
                      <p data-testid={ `${index}-recomendation-title` }>
                        { recommended.strDrink }
                      </p>
                    </Carousel.Caption>
                  </Carousel.Item>
                ) : null
              ))
            ) : <Spinner animation="grow" variant="warning">Loading...</Spinner>}
          </Carousel>
        </div>
        <section>
          <Button
            type="button"
            data-testid="start-recipe-btn"
            onClick={ () => handleStartRecipe() }
          >
            { text }
          </Button>
        </section>
      </section>
    </Card>
  );
}

export default FoodDetailCard;
