import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import RecipeContext from './RecipeContext';
import {
  getAllCategoriesMeal,
  getAllIngredientsMeal,
  getAllCategoriesDrinks,
  getAllIngredientsDrinks,
  getRecipeByIngredient,
  getRecipeByName,
  getRecipeByFirstLetter,
} from '../services/recipesRequest';

function RecipeProvider({ children }) {
  const [mealsRecipes, setMealsRecipes] = useState([]);
  const [drinksRecipes, setDrinksRecipes] = useState([]);
  const [foodsCategories, setFoodsCategory] = useState([]);
  const [foodsIngredients, setFoodsIngredients] = useState([]);
  const [drinksCategories, setDrinksCategories] = useState([]);
  const [drinksIngredients, setDrinksIngredients] = useState([]);
  const [ingredientInput, setIngredientInput] = useState('');
  const [searchIngredients, setSearchIngredients] = useState([]);
  const [radioSelected, setRadioSelected] = useState('');
  const [locationName, setLocationName] = useState('');
  const [showSearchBar, setShowSearchInput] = useState(false);
  const [recipesDb, setRecipesDb] = useState([]);

  const retrieveFoods = async () => {
    setFoodsCategory(await getAllCategoriesMeal());
    setFoodsIngredients(await getAllIngredientsMeal());
  };

  const retrieveDrinks = async () => {
    setDrinksCategories(await getAllCategoriesDrinks());
    setDrinksIngredients(await getAllIngredientsDrinks());
  };

  const retrieveSearchedRecipeByIngredient = async () => {
    setSearchIngredients(
      await getRecipeByIngredient(
        locationName,
        ingredientInput,
      ),
    );
  };

  const retrieveSearchedRecipeByName = async () => {
    setSearchIngredients(
      await getRecipeByName(
        locationName,
        ingredientInput,
      ),
    );
  };

  const retrieveSearchedRecipeByFirstLetter = async () => {
    if (ingredientInput.length > 1) {
      global.alert('Sua busca deve conter somente 1 (um) caracter');
    } else {
      setSearchIngredients(
        await getRecipeByFirstLetter(
          locationName,
          ingredientInput,
        ),
      );
    }
  };

  const handleSearchButtonClick = () => {
    setShowSearchInput(!showSearchBar);
  }

  const handleInputChange = (value) => {
    setIngredientInput(value);
  };

  const handleRadioChange = (value) => {
    setRadioSelected(value);
  };

  const handleClick = () => {
    switch (radioSelected) {
    case 'ingredient':
      retrieveSearchedRecipeByIngredient();
      break;
    case 'name':
      retrieveSearchedRecipeByName();
      break;
    case 'first-letter':
      retrieveSearchedRecipeByFirstLetter();
      break;
    default:
      return 0;
    }
    setShowSearchInput(false);
  };

  // didMount da massa
  useEffect(() => {
    retrieveFoods();
    retrieveDrinks();
  }, []);

  const contextValue = {
    foodsCategories,
    foodsIngredients,
    drinksCategories,
    drinksIngredients,
    searchIngredients,
    mealsRecipes,
    showSearchBar,
    handleClick,
    handleInputChange,
    handleRadioChange,
    setLocationName,
    handleSearchButtonClick,
    // mealsRecipes,
  };

  console.log(mealsRecipes);

  return (
    <RecipeContext.Provider value={ contextValue }>
      {children}
    </RecipeContext.Provider>
  );
}

RecipeProvider.propTypes = {
  // PropTypes feita com base no stackoverflow, disponível em:
  // https://stackoverflow.com/questions/42122522/reactjs-what-should-the-proptypes-be-for-this-props-children
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
};

export default RecipeProvider;
