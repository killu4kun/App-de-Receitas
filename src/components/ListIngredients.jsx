import React, { useEffect, useState } from 'react';
import { useHistory, useLocation } from 'react-router';
import PropTypes from 'prop-types';
import { setDate } from '../services/utilityFunctions';
import '../css/foodInProgress.css';
import Button from './Button';

const SLICE_ROUTE = 8;
const ListIngredients = ({ ingredients, recipeForLocalStorage }) => {
  const { pathname } = useLocation();
  const history = useHistory();
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
  const [compareChecked, setCompareChecked] = useState(handleChecked() !== undefined
    ? handleChecked() : {});
  const [disabled, setDisabled] = useState(true);
  const [arrayForLocalStorage, setArrayForLocalStorage] = useState([]);

  useEffect(() => {
    setDisabled(Object.values(compareChecked)
      .some((value) => value === false)
      || Object.values(compareChecked).length !== ingredients.length);
  }, [compareChecked, ingredients.length]);

  useEffect(() => {
    const setLocalStorage = () => {
      const meals = {
        [locationID]: [compareChecked],
      };
      localStorage.setItem('meals', JSON.stringify(meals));
    };
    setLocalStorage();
  }, [compareChecked, locationID, pathname]);

  console.log(arrayForLocalStorage);

  useEffect(() => {
    localStorage.setItem('doneRecipes', JSON.stringify(arrayForLocalStorage));
  }, [arrayForLocalStorage]);

  const handleCheckboxControl = (index, checked) => {
    setCompareChecked((prevState) => ({
      ...prevState,
      [index]: checked,
    }));
  };
  console.log(recipeForLocalStorage);

  const handleRedirect = () => {
    const currentRecipeMeal = {
      id: locationID,
      type: pathname.slice(1, SLICE_ROUTE),
      area: recipeForLocalStorage.strArea ? recipeForLocalStorage.strArea : '',
      category: recipeForLocalStorage.strCategory
        ? recipeForLocalStorage.strCategory : '',
      alcoholicOrNot: recipeForLocalStorage.strAlcoholic
        ? recipeForLocalStorage.strAlcoholic : '',
      name: recipeForLocalStorage.strMeal,
      image: recipeForLocalStorage.strMealThumb,
      doneDate: setDate(),
      tags: recipeForLocalStorage.strTags === null
        ? [] : recipeForLocalStorage.strTags,
    };
    console.log(currentRecipeMeal);
    setArrayForLocalStorage((prevState) => [...prevState, currentRecipeMeal]);

    history.push('/receitas-feitas');
  };

  console.log(arrayForLocalStorage);

  return (
    <>
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
      <footer>
        <Button
          text="Finalizar receita"
          dataTestId="finish-recipe-btn"
          onClick={ () => handleRedirect() }
          disabled={ disabled }
        />
      </footer>
    </>
  );
};

ListIngredients.propTypes = {
  ingredients: PropTypes.arrayOf(PropTypes.string).isRequired,
  recipeForLocalStorage: PropTypes.objectOf(PropTypes.object).isRequired,
};

export default ListIngredients;
