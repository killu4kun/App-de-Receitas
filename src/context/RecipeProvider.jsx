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
  getRecipeByCategory,
  getRecipeByFirstLetter,
} from '../services/recipesRequest';

// const MAX_SEARCH_INGREDIENTS_LENGTH = 12;

function RecipeProvider({ children }) {
  const [clickedCategory, setClicked] = useState('');
  const [mealsRecipes, setMealsRecipes] = useState({});
  const [filteredCategory, setFilteredCategory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadingCategories, setLoadingCategories] = useState(true);
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
  const [recipeInProgress, setRecipeInProgress] = useState([]);
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
  const [recipesDb, setRecipesDb] = useState([]);

  // const [urlFoods,setUrlFoods] = useState([]);
  const [recipeID, setRecipeID] = useState('');
  const [ID, setID] = useState(''); // essa função vai ser utilizada para pegar o id da receita
  // buscada no retorno da API na pagina de detalhes
  const [doneRecipesFilter, setDoneRecipesFilter] = useState(''); // função e estado para armazenar o tipo do filtro
  // das receitas prontas/ estado incial filter all

  const retrieveFoods = async () => {
    // console.log(("true"),setLoadingCategories);
    setFoodsCategory(await getAllCategoriesMeal());
    setFoodsIngredients(await getAllIngredientsMeal());
    if (drinksCategories.length > 0
      && foodsCategories.length > 0) { setLoadingCategories(false); }
    // console.log(("false"),setLoadingCategories);
  };

  const retrieveDrinks = async () => {
    setDrinksCategories(await getAllCategoriesDrinks());
    setDrinksIngredients(await getAllIngredientsDrinks());
    if (drinksCategories.length > 0
      && foodsCategories.length > 0) { setLoadingCategories(false); }
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
    console.log(('input change'), value);
  };

  const handleRadioChange = (value) => {
    setRadioSelected(value);
    console.log('radio change', value);
  };

  const handleCategorySelected = async (location, categoria) => {
    if (categoria === clickedCategory) {
      setFilteredCategory([]);
      setClicked('');
    } else {
      setClicked(categoria);
      setFilteredCategory(
        await getRecipeByCategory(
          location,
          categoria,
        ),
      );
    }
    setSearchIngredients([]);
  };

  const handleAllCategory = () => {
    setFilteredCategory([]);
    setSearchIngredients([]);
  };

  console.log(('Filtered Category'), filteredCategory);
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
    setFilteredCategory([]);
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
  console.log(('filteredCategory2'), filteredCategory);
  const contextValue = {
    filteredCategory,
    loadingCategories,
    foodsCategories,
    foodsIngredients,
    drinksCategories,
    drinksIngredients,
    searchIngredients,
    mealsRecipes,
    drinksRecipes,
    showSearchBar,
    doneRecipesFilter,
    recipeInProgress,
    loading,
    recipeID,
    recipesDb,
    ID,
    setSearchIngredients,
    handleCategorySelected,
    handleClick,
    handleInputChange,
    handleRadioChange,
    setLocationName,
    handleSearchButtonClick,
    setDoneRecipesFilter,
    setRecipeInProgress,
    setLoading,
    setRecipeID,
    setID,
    handleAllCategory,
    setRecipesDb,
  };
  // console.log(('mealRecipes :'), mealsRecipes);
  console.log(('searchIngredients :'), searchIngredients);
  // console.log(loading);

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
