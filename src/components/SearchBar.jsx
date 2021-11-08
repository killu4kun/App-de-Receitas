import React from 'react';

function SearchBar() {
  return (
    <section>
      <input placeholder="Buscar receita" data-testid="search-input" />
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
