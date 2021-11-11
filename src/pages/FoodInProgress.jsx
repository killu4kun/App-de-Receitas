import React from 'react';

import { useHistory } from 'react-router';

import Button from '../components/Button';
import ListIngredients from '../components/ListIngredients';

function FoodInProgress() {
  const history = useHistory();
  const copy = require('clipboard-copy');
  const handleClick = () => {
    copy('Favoritar receita')
  }
  // const regexForIngredients = /ingredient/i
  // const filterIngredients = Object.keys(foodInProgress)
  //   .filter((food) => regexForIngredients.test(food))
  return (
    <div>
      <header>
        <img data-testid="recipe-photo" alt="comida em progresso" />
        <h1 data-testid="recipe-title"> FoodInProgress </h1>
      </header>
      <main>
        <h4 data-testid="recipe-category">categoria da receita</h4>
        <Button
          dataTestId="share-btn"
        />
        <Button
          text="Favoritar receita"
          dataTestId="favorite-btn"
          onClick={ () => handleClick }
        />
        <h4 data-testid="instructions">Instruções de preparo</h4>
        {/* <ListIngredients /> */}
      </main>
      <footer>
        <Button
          text="Finalizar receita"
          dataTestId="finish-recipe-btn"
          onClick={ () => history.push('/receitas-feitas') }
        />
      </footer>
    </div>
  );
}

export default FoodInProgress;
