import React from 'react';

import { useHistory } from 'react-router';

import Button from '../components/Button';
import ListIngredients from '../components/ListIngredients';

function FoodInProgress() {
  const history = useHistory();
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
          dataTestId="favorite-btn"
        />
        <h4 data-testid="instructions">Instruções de preparo</h4>
        <ListIngredients />
      </main>
      <footer>
        <Button
          dataTestId="finish-recipe-btn"
          onClick={ () => history.push('/receitas-feitas') }
        />
      </footer>
    </div>
  );
}

export default FoodInProgress;
