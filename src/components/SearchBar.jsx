import React, { useEffect, useState } from 'react';
import { Redirect, useLocation } from 'react-router';
import RecipeContext from '../context/RecipeContext';
import { getRecipeByIngredient } from '../services/recipesRequest';
import Button from './Button';

function SearchBar() {
  const [ingredient, setIngredient] = useState('');
  const [searchIngredients, setSearchIngredients] = useState([]);
  const [radioSelected, setRadioSelected] = useState('');
  const { pathname } = useLocation();
  const locationName = pathname.slice(1);

  useEffect(() => {
    const retrieveSearchedRecipe = async () => {
      setSearchIngredients(
        await getRecipeByIngredient(
          locationName,
          ingredient,
        ),
      );
    };

    retrieveSearchedRecipe();
  }, [ingredient, locationName]);
  console.log(searchIngredients);

  const handleChange = (value) => {
    setRadioSelected(value);
  };

  useEffect(() => {
    switch (radioSelected) {
    case 'ingredient':
      break;
    case 'name':
      break;
    case 'first-letter':
      break;
    default:
      return 0;
    }
  }, [ingredient]);

  // searchRecipe.length === 1 && <Redirect to={`/${locationName}/${searchRecipe[0].idMeal}`}
  console.log(radioSelected);
  return (
    <section>
      <input
        placeholder="O que você deseja comer?"
        data-testid="search-input"
        onChange={ ({ target: { value } }) => setIngredient(value) }
      />
      <label
        htmlFor="chosen-filter"
        onChange={ ({ target: { value } }) => handleChange(value) }
      >
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
      <Button text="Buscar" />
    </section>
  );
}

export default SearchBar;
