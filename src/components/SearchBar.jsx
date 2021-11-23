import React, { useEffect, useContext } from 'react';
import { useLocation } from 'react-router';
import Input from './Input';
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
    <>
      <Input
        type="text"
        dataTestId="search-input"
        name="search-input"
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
        variant="outline-sucess"
        onClick={ handleClick }
        dataTestId="exec-search-btn"
      />
    </>
  );
}
export default SearchBar;
