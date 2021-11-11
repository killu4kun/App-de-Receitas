import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router';
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

const MAX_SEARCH_INGRIDIENTS_LENGTH = 12;

function RecipeProvider({ children }) {
  const [mealsRecipes, setMealsRecipes] = useState({});
  const [loading, setLoading] = useState(true);
  const [drinksRecipes, setDrinksRecipes] = useState({});
  const [foodsCategories, setFoodsCategory] = useState([]);
  const [foodsIngredients, setFoodsIngredients] = useState([]);
  const [drinksCategories, setDrinksCategories] = useState([]);
  const [drinksIngredients, setDrinksIngredients] = useState([]);
  const [ingredientInput, setIngredientInput] = useState('');
  const [searchIngredients, setSearchIngredients] = useState([]);
  const [radioSelected, setRadioSelected] = useState('');
  const [locationName, setLocationName] = useState('');
  const [showSearchBar, setShowSearchInput] = useState(false);
  const [recipeInProgress, setRecipeInProgress] = useState([])
  const history = useHistory();
  useEffect(() => {
    if (searchIngredients === null || searchIngredients === undefined) {
      return global
        .alert('Sinto muito, não encontramos nenhuma receita para esses filtros.');
    }
    if (searchIngredients.length === 1) {
      if (locationName === 'comidas') {
        history.push(`${locationName}/${searchIngredients[0].idMeal}`);
      } else if (locationName === 'bebidas') {
        history.push(`${locationName}/${searchIngredients[0].idDrink}`);
      }
    }
    // else if (searchIngredients.length > 1) {
    //   setSearchIngredients(searchIngredients.slice(0, MAX_SEARCH_INGRIDIENTS_LENGTH));
    // }
  }, [locationName, searchIngredients, history]);

  const [recipeID, setRecipeID] = useState('');
  const [ID, setID] = useState(''); // essa função vai ser utilizada para pegar o id da receita
  // buscada no retorno da API na pagina de detalhes

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
  };

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
    async function fetchData() {
      const mealsResponse = await fetch('https://www.themealdb.com/api/json/v1/1/search.php?s=');
      const baseMeals = await mealsResponse.json();
      setMealsRecipes(baseMeals);
      const drinksResponse = await fetch('https://www.thecocktaildb.com/api/json/v1/1/search.php?s=');
      const baseDrinks = await drinksResponse.json();
      setDrinksRecipes(baseDrinks);
      setLoading(false);
    }
    fetchData();
  }, []);

  const contextValue = {
    foodsCategories,
    foodsIngredients,
    drinksCategories,
    drinksIngredients,
    searchIngredients,
    mealsRecipes,
    drinksRecipes,
    showSearchBar,
    recipeInProgress,
    loading,
    recipeID,
    ID,
    setRecipeInProgress,
    handleClick,
    handleInputChange,
    handleRadioChange,
    setLocationName,
    handleSearchButtonClick,
    setLoading,
    setRecipeID,
    setID,
  };
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
