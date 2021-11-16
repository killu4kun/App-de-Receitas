import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
// import RecipeContext from '../context/RecipeContext';
import '../css/foodInProgress.css';

const ListIngredients = ({ ingredients }) => {
  const [compareChecked, setCompareChecked] = useState({});
  // const [retrieveIndex, setRetrieveIndex] = useState(0);
  // const { ID } = useContext(RecipeContext);
  // useEffect(() => {
  //   const meals = {
  //     [ID]: ID ? { ingredients, index: retrieveIndex } : ingredients,
  //   };
  //   localStorage.setItem('meals', JSON.stringify(meals));
  // }, [compareChecked, retrieveIndex, ID, ingredients]);

  // recuperar localStorage
  // fazer um map em cada ingrediente e transformar
  // em objeto com a chave checked, id e ingrediente
  // {}

  const handleCheckboxControl = (index, checked) => {
    setCompareChecked((prevState) => ({
      ...prevState,
      [index]: checked,
    }));
  };

  return (
    <ol>
      {ingredients.map((ingredient, index) => (
        <li
          data-testid={ `${index}-ingredient-step` }
          key={ index }
        >
          <label
            className={ compareChecked[index] ? 'decoration' : null }
            htmlFor={ `${index}-ingredients-checkbox` }
          >
            <input
              id={ `${index}-ingredients-checkbox` }
              type="checkbox"
              // checked={ checkboxControl }
              onChange={ ({ target: { checked } }) => {
                handleCheckboxControl(index, checked);
              } }
            />
            {ingredient}
          </label>
        </li>
      ))}
    </ol>
  );
};

ListIngredients.propTypes = {
  ingredients: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default ListIngredients;
