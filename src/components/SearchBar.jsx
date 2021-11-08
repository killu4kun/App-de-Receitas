import React from 'react';

function SearchBar() {
  return (
    <section>
      <input placeholder="Buscar receita" data-testid="search-input" />
      <fieldset>
        <label htmlFor="ingredient">
          <input
            type="radio"
            id="ingredient"
            value="ingredient"
            data-testid="ingredient-search-radio"
            />
            Ingrediente
        </label>
        <label htmlFor="name">
          <input
            type="radio"
            id="name"
            value="name"
            data-testid="name-search-radio"
            />
            Nome
        </label>
        <label htmlFor="first-letter">
          <input
            type="radio"
            id="first-letter"
            value="first-letter"
            data-testid="first-letter-search-radio"
          />
          Primeira letra
        </label>
      </fieldset>
    </section>
  );
}

export default SearchBar;
