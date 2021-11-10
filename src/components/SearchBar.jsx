import React, { useContext, useEffect } from 'react';
import { Redirect, useLocation } from 'react-router';
import RecipeContext from '../context/RecipeContext';

import Button from './Button';

function SearchBar() {
  const { setLocationName, handleClick,
    handleInputChange, handleRadioChange } = useContext(RecipeContext);
  const { pathname } = useLocation();
  const locationRoute = pathname.slice(1);

  useEffect(() => {
    setLocationName(locationRoute);
  }, []);

  // searchRecipe.length === 1 && <Redirect to={`/${locationName}/${searchRecipe[0].idMeal}`}
  return (
    <section>
      <input
        placeholder="O que você deseja comer?"
        data-testid="search-input"
        onChange={ ({ target: { value } }) => handleInputChange(value) }
      />
      <label
        htmlFor="chosen-filter"
        onChange={ ({ target: { value } }) => handleRadioChange(value) }
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
      <Button
        text="Buscar"
        onClick={ handleClick }
        dataTestId="exec-search-btn"
      />
    </section>
  );
}

export default SearchBar;
