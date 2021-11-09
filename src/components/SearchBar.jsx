import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router';
import RecipeContext from '../context/RecipeContext';
import { getRecipeByIngredient } from '../services/recipesRequest';

function SearchBar() {
  const [ingredient, setIngredient] = useState('');
  const [searchIngredients, setSearchIngredients] = useState([]);
  const { pathname } = useLocation();
  const locationName = pathname.slice(1);

  const retrieveSearchedRecipe = async () => {
    setSearchIngredients(
      await getRecipeByIngredient(
        locationName,
        ingredient,
      ),
    );
  };

  useEffect(() => {
    retrieveSearchedRecipe();
  }, []);
  console.log(searchIngredients)

  // useEffect(() => {
  //   switch() {
  //     case :
  //     break;
  //     case :
  //     break;
  //     case :
  //     break;
  //     case :
  //     break;
  //   }
  // }, [ingredient]);

  return (
    <section>
      <input
        placeholder="O que você deseja comer?"
        data-testid="search-input"
        onChange={ ({ target: { value } }) => setIngredient(value)}
      />
      <label htmlFor="chosen-filter">
        <input
          name="chosen-filter"
          type="radio"
          id="ingredient"
          value="ingredient"
          data-testid="ingredient-search-radio"
        />
        Ingrediente
        <input
          name="chosen-filter"
          type="radio"
          id="name"
          value="name"
          data-testid="name-search-radio"
        />
        Nome
        <input
          name="chosen-filter"
          type="radio"
          id="first-letter"
          value="first-letter"
          data-testid="first-letter-search-radio"
        />
        Primeira letra
      </label>
    </section>
  );
}

export default SearchBar;
