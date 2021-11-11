import React from 'react';
import PropTypes from 'prop-types';

const ListIngredients = ({ ingredients }) => {
  console.log(ingredients)
  return (
  <ol>
    {ingredients.map(({ ingredient }, index) => (
      <li
        data-testid={ `${index}-ingredient-step` }
        key={ index }
      >
        <label>
        <input type="checkbox" />
        {ingredient}
        </label>
      </li>
    ))}
  </ol>)
}
;

ListIngredients.propTypes = {
  ingredients: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default ListIngredients;
