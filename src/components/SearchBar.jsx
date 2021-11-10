import React, { useEffect, useContext } from 'react';
import { useLocation } from 'react-router';
import Button from './Button';
import RecipeContext from '../context/RecipeContext';

function SearchBar() {
  const { setLocationName, handleClick,
    handleInputChange, handleRadioChange } = useContext(RecipeContext);
  const { pathname } = useLocation();
  const locationRoute = pathname.slice(1);

  useEffect(() => {
    setLocationName(locationRoute);
  }, []);

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
        data-testid="exec-search-btn"
      />
    </section>
  );
}

export default SearchBar;
