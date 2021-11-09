import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import RecipeContext from './RecipeContext';
import {
  getAllCategoriesMeal,
  getAllIngredientsMeal,
  getAllCategoriesDrinks,
  getAllIngredientsDrinks,
} from '../services/recipesRequest';

function RecipeProvider({ children }) {
  const [mealsRecipes, setMealsRecipes ] = useState([]);
  const [drinksRecipes, setDrinksRecipes ] = useState([]);
  const [foodsCategories, setFoodsCategory] = useState([]);
  const [foodsIngredients, setFoodsIngredients] = useState([]);
  const [drinksCategories, setDrinksCategories] = useState([]);
  const [drinksIngredients, setDrinksIngredients] = useState([]);

  const retrieveFoods = async () => {
    setFoodsCategory(await getAllCategoriesMeal());
    setFoodsIngredients(await getAllIngredientsMeal());
  };

  const retrieveDrinks = async () => {
    setDrinksCategories(await getAllCategoriesDrinks());
    setDrinksIngredients(await getAllIngredientsDrinks());
  };
  
  const shuffleArray = (array) => {
    const arr = array;
    for (let index = arr.length - 1; index > 0; index -= 1) {
      const nextIndex = Math.floor(Math.random() * (index + 1));
      const temp = arr[index];
      arr[index] = arr[nextIndex];
      arr[nextIndex] = temp;
    }
    return arr;
  };

  const randomFood = async () => {
    let results = '';
    if (foodsCategories.length !== 0) {
      const foodsToShuffle = foodsCategories.map((food) => Object.values(food)[0]);
      const response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${shuffleArray(foodsToShuffle)}`);
      results = response.json();
    }
    return results.meals;
  };

  randomFood().then(e => console.log(e));

  // const receiveRecipes = async () => {
  //   setMealsRecipes(await );
  //   setDrinksRecipes(await );
  // };

  // didMount da massa
  useEffect(() => {
    retrieveFoods();
    retrieveDrinks();
  }, []);

  // const fetchPlanets = async () => {
  //   setLoading(true);
  //   const response = await fetch(PLANET_API);
  //   const { results } = await response.json(); // Dica do Glauco Lomenha, 14B
  //   setData(results);
  //   setLoading(false);
  // };

  // useEffect(() => {
  //   fetchPlanets();
  // }, []);

  const contextValue = {
    foodsCategories,
    foodsIngredients,
    drinksCategories,
    drinksIngredients,
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
