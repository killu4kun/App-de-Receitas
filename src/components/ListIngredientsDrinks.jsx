import React, { useEffect, useState } from 'react';
import { useHistory, useLocation } from 'react-router';
import PropTypes from 'prop-types';
import { setDate } from '../services/utilityFunctions';
import '../css/foodInProgress.css';
import Button from './Button';

const SLICE_ROUTE = 8;
const ListIngredientsDrink = ({ ingredients, recipeForLocalStorage }) => {
  const { pathname } = useLocation();
  const history = useHistory();
  const regex = /\d+/g;
  const [locationID] = pathname.match(regex);
  const handleChecked = () => {
    // retorna true or undefined
    if (localStorage.getItem('cocktails')) {
      const recipe = localStorage.getItem('cocktails');
      const recipeJSon = JSON.parse(recipe)[locationID];
      const recipeChecked = recipeJSon[0];
      return recipeChecked;
    }
    return {};
  };
  const [compareChecked, setCompareChecked] = useState(handleChecked());
  const [disabled, setDisabled] = useState(true);
  const [arrayForLocalStorage, setArrayForLocalStorage] = useState([]);

  useEffect(() => {
    setDisabled(Object.values(compareChecked)
      .some((value) => value === false)
      || Object.values(compareChecked).length !== ingredients.length);
  }, [compareChecked, ingredients.length]);

  useEffect(() => {
    const setLocalStorage = () => {
      const cocktails = {
        [locationID]: [compareChecked],
      };
      localStorage.setItem('cocktails', JSON.stringify(cocktails));
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

  const handleRedirect = () => {
    const currentRecipeDrink = {
      id: recipeForLocalStorage.idDrink,
      type: pathname.slice(1, SLICE_ROUTE),
      area: recipeForLocalStorage.strArea ? recipeForLocalStorage.strArea : '',
      category: recipeForLocalStorage.strCategory
        ? recipeForLocalStorage.strCategory : '',
      alcoholicOrNot: recipeForLocalStorage.strAlcoholic
        ? recipeForLocalStorage.strAlcoholic : '',
      name: recipeForLocalStorage.strDrink,
      image: recipeForLocalStorage.strDrinkThumb,
      doneDate: setDate(),
      tags: recipeForLocalStorage.strTags === null
        ? [] : recipeForLocalStorage.strTags,
    };
    setArrayForLocalStorage((prevState) => [...prevState, currentRecipeDrink]);

    history.push('/receitas-feitas');
  };

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

ListIngredientsDrink.propTypes = {
  ingredients: PropTypes.arrayOf(PropTypes.string).isRequired,
  recipeForLocalStorage: PropTypes.objectOf(PropTypes.string).isRequired,
};

export default ListIngredientsDrink;
