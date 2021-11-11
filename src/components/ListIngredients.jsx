import React from 'react';
import PropTypes from 'prop-types';

const ListIngredients = ({ ingredients }) => (
  <ol>
    {ingredients.map((ingredient, index) => (
      <li
        data-testid={ `${index}-ingredient-step` }
        key={ index }
      >
        <input type="checkbox">
        {ingredient}
        </input>
      </li>
    ))}
  </ol>
);

ListIngredients.propTypes = {
  ingredients: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default ListIngredients;
