import React, { useEffect, useState } from 'react';
import { useHistory, useLocation } from 'react-router';
import PropTypes from 'prop-types';
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

  const setDate = () => {
    // implementação da data obtida através de código visto em:
    // https://www.horadecodar.com.br/2021/04/03/como-pegar-a-data-atual-com-javascript/
    const date = new Date();
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    const presentDate = `${day}/${month}/${year}`;
    return presentDate;
  };
  const handleRedirect = () => {
    const currentRecipeDrink = {
      id: recipeForLocalStorage.idDrink,
      type: pathname.slice(1, SLICE_ROUTE),
      area: recipeForLocalStorage.srtArea ? recipeForLocalStorage.srtArea : '',
      category: recipeForLocalStorage.srtCategory
        ? recipeForLocalStorage.srtCategory : '',
      alcoholicOrNot: recipeForLocalStorage.srtAlcoholic
        ? recipeForLocalStorage.srtAlcoholic : '',
      name: recipeForLocalStorage.srtDrink,
      image: recipeForLocalStorage.strDrinkThumb,
      doneDate: setDate(),
      tags: recipeForLocalStorage.srtTags === null
        ? [] : recipeForLocalStorage.srtTags,
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
