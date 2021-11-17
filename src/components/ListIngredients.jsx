import React, { useEffect, useState, useContext } from 'react';
import PropTypes from 'prop-types';
import '../css/foodInProgress.css';
import { useLocation } from 'react-router';

const ListIngredients = ({ ingredients }) => {
  const [compareChecked, setCompareChecked] = useState({});
  const [isChecked, setIsChecked] = useState({});
  const { pathname } = useLocation();
  const regex = /\d+/g;
  const [locationID] = pathname.match(regex);
  console.log(locationID)

  // useEffect(() => {
  //   const meals = {
  //     [locationID]: [compareChecked],
  //   };
  //   localStorage.setItem('meals', JSON.stringify(meals));
  // }, [compareChecked]);
  // recuperar localStorage
  // fazer um map em cada ingrediente e transformar
  // em objeto com a chave checked, id e ingrediente
  // {}

  const handleCheckboxControl = (index, checked) => {
    setCompareChecked((prevState) => ({
      ...prevState,
      [index]: checked,
    }));
    setLocalStorage();
  };

  const setLocalStorage = () => {
    const meals = {
      [locationID]: [compareChecked],
    };
    localStorage.setItem('meals', JSON.stringify(meals));
  }

  useEffect(() => {
    const handleChecked = () => {
      // retorna true or undefined
      if(localStorage.getItem('meals')){
        const recipe = localStorage.getItem('meals');
        const recipeJSon = JSON.parse(recipe)[locationID];
        const recipeChecked = recipeJSon[0];
        setIsChecked(recipeChecked);
      }
    }
    handleChecked();
  }, [compareChecked]);


  return (
    <ol>
      {ingredients.map((ingredient, index) => (
        <li
          data-testid={ `${index}-ingredient-step` }
          key={ index }
        >
          <label
            className={ isChecked[index] ? 'decoration' : null }
            htmlFor={ `${index}-ingredients-checkbox` }
          >
            <input
              id={ `${index}-ingredients-checkbox` }
              type="checkbox"
              checked={ isChecked[index] }
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
