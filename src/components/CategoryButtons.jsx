import React, { useContext, useEffect } from 'react';
import { useLocation } from 'react-router';
import RecipeContext from '../context/RecipeContext';

function CategoriesButtons({ title }) {
  const { pathname } = useLocation();
  const locationRoute = pathname.slice(1);
  const { setLocationName, drinksCategories, foodsCategories, handleCategorySelected } = useContext(RecipeContext);
  const maxResults = 5;
  useEffect(() => {
    setLocationName(locationRoute);
  }, []);
  const everyCategoryDrink = Object.values(drinksCategories).slice(0, maxResults);
  const everyCategoryMeal = Object.values(foodsCategories).slice(0, maxResults);
  let actualCategory = null;
  if (title === 'Comidas') {
    actualCategory = everyCategoryMeal;
  } else { actualCategory = everyCategoryDrink; }
  const everyButtonCategory = actualCategory
    .map((category, index) => (
      <div
        className="category-button"
        data-testid={ `${index}-category-card` }
        key={ index }
      >
        <button
          type="button"
          data-testid={ `${category.strCategory}-category-filter` }
          name={ category.strCategory }
          onClick={ ({ target }) => handleCategorySelected(locationRoute, target.name) }
        >
          { category.strCategory }
        </button>

      </div>));

  return (
    <div
      className="div-cards"
    >
      { everyButtonCategory }
    </div>
  );
}

export default CategoriesButtons;
