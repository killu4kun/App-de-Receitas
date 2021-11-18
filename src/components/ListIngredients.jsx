import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import '../css/foodInProgress.css';
import { useLocation } from 'react-router';

const ListIngredients = ({ ingredients }) => {
  const { pathname } = useLocation();
  const regex = /\d+/g;
  const [locationID] = pathname.match(regex);
  const handleChecked = () => {
    // retorna true or undefined
    if (localStorage.getItem('meals')) {
      const recipe = localStorage.getItem('meals');
      const recipeJSon = JSON.parse(recipe)[locationID];
      const recipeChecked = recipeJSon[0];
      return recipeChecked;
    }
  };
  const [compareChecked, setCompareChecked] = useState(localStorage.getItem('meals') ? handleChecked() : {});

  useEffect(() => {
    const setLocalStorage = () => {
      const meals = {
        [locationID]: [compareChecked],
      };
      localStorage.setItem('meals', JSON.stringify(meals));
    };
    setLocalStorage();
  }, [compareChecked, locationID]);

  const handleCheckboxControl = (index, checked) => {
    setCompareChecked((prevState) => ({
      ...prevState,
      [index]: checked,
    }));
  };

  handleChecked();

  console.log(compareChecked);
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
              checked={ compareChecked[index] }
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
