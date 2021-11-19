import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import RecipeContext from '../context/RecipeContext';
import ShareIcon from '../images/shareIcon.svg';
import BlackHeart from '../images/blackHeartIcon.svg';
import WhiteHeart from '../images/whiteHeartIcon.svg';
import { handleToShareBtn } from '../services/utilityFunctions';

function FavoriteRecipeCard() {
  const favoriteRecipesLocalStorage = JSON.parse(localStorage.getItem('favoriteRecipes'));
  const { doneRecipesFilter } = useContext(RecipeContext);
  const [favorited, setFavorited] = useState(true);

  function removeFromFavorites(recipe) {
    setFavorited(false);
    const favoriteList = JSON.parse(localStorage.getItem('favoriteRecipes'));
    const newFavoriteList = favoriteList.filter((item) => item.id !== recipe.id);
    localStorage.setItem('favoriteRecipes', JSON.stringify(newFavoriteList));
    window.location.reload();
  }

  return (
    <div>
      { favoriteRecipesLocalStorage ? favoriteRecipesLocalStorage.filter((recipe) => (
        recipe.type !== doneRecipesFilter))
        .map((recipe, index) => (
          <div key={ recipe.id }>
            <Link to={ `/${recipe.type}s/${recipe.id}` }>
              <img
                data-testid={ `${index}-horizontal-image` }
                src={ recipe.image }
                alt={ recipe.name }
              />
            </Link>
            <p
              data-testid={ `${index}-horizontal-top-text` }
            >
              { recipe.type === 'comida'
                ? `${recipe.area} - ${recipe.category}`
                : `${recipe.alcoholicOrNot}` }
            </p>
            <Link to={ `/${recipe.type}s/${recipe.id}` }>
              <h3 data-testid={ `${index}-horizontal-name` }>{ recipe.name }</h3>
            </Link>
            <button
              type="button"
              data-testid={ `${index}-horizontal-share-btn` }
              onClick={ ({ target }) => handleToShareBtn(target, recipe.id, recipe.type) }
              text="Compartilhar receita"
              src={ ShareIcon }
            >
              <img src={ ShareIcon } alt="compartilhar" />
            </button>
            <button
              type="button"
              data-testid={ `${index}-horizontal-favorite-btn` }
              onClick={ () => removeFromFavorites(recipe) }
              text="desfavoritar"
              src={ favorited ? BlackHeart : WhiteHeart }
            >
              <img src={ favorited ? BlackHeart : WhiteHeart } alt="desfavoritar" />
            </button>
          </div>
        )) : <p>Loading...</p>}
    </div>
  );
}

export default FavoriteRecipeCard;
