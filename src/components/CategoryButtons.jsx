import React, { useContext, useEffect } from 'react';
import { useLocation } from 'react-router';
import PropTypes from 'prop-types';
import RecipeContext from '../context/RecipeContext';

function CategoriesButtons({ title }) {
  const { pathname } = useLocation();
  const locationRoute = pathname.slice(1);
  const { setLocationName, drinksCategories,
    foodsCategories, handleCategorySelected,
    handleAllCategory } = useContext(RecipeContext);
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
      <button
        type="button"
        data-testid="All-category-filter"
        name="All"
        onClick={ () => handleAllCategory() }
      >
        All
      </button>
      { everyButtonCategory }
    </div>
  );
}

CategoriesButtons.propTypes = {
  title: PropTypes.string.isRequired,
};

export default CategoriesButtons;
