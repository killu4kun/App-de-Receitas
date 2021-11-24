import React, { useState, useEffect, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import RecipeContext from '../context/RecipeContext';
import { getRecipeByIngredient } from '../services/recipesRequest';

function ExploreFoodIngredients() {
  const [ingredients, setIngredients] = useState([]);
  const { setSearchIngredients } = useContext(RecipeContext);
  const history = useHistory();
  const limits = 12;

  async function getFoodIngredients() {
    const response = await fetch('https://www.themealdb.com/api/json/v1/1/list.php?i=list');
    const data = await response.json();
    setIngredients(data.meals);
  }

  useEffect(() => {
    getFoodIngredients();
  }, []);

  async function handleClick(ingredient) {
    setSearchIngredients(await getRecipeByIngredient('comidas', ingredient));
    history.push('/comidas');
  }
  return (
    <div>
      <Header title="Explorar Ingredientes" showSearch={ false } />
      <div className="card-container">
        {
          ingredients.map((meal, index) => (
            (index < limits) && (
              <button
                name={ ingredients.strIngredient }
                type="button"
                onClick={ () => {
                  handleClick(meal.strIngredient);
                } }
              >
                <div className="card-style">
                  <div className="card-img" data-testid={ `${index}-ingredient-card` }>
                    <img
                      name={ meal.strIngredient }
                      src={ `https://www.themealdb.com/images/ingredients/${meal.strIngredient}-Small.png` }
                      data-testid={ `${index}-card-img` }
                      alt={ meal.strIngredient }
                    />
                  </div>
                  <div name={ meal.strIngredient } className="card-title">
                    <span
                      data-testid={ `${index}-card-name` }
                    >
                      { meal.strIngredient }
                    </span>
                  </div>
                </div>
              </button>
            )
          ))
        }
      </div>
      <Footer />
    </div>
  );
}

export default ExploreFoodIngredients;
