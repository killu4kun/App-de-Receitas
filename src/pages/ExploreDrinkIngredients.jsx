import React, { useContext, useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import RecipeContext from '../context/RecipeContext';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { getRecipeByIngredient } from '../services/recipesRequest';

function ExploreDrinkIngredients() {
  const [ingredients, setIngredients] = useState([]);
  const { setSearchIngredients } = useContext(RecipeContext);
  const history = useHistory();
  const limits = 12;

  useEffect(() => {
    const getIngredients = async () => {
      const response = await fetch('https://www.thecocktaildb.com/api/json/v1/1/list.php?i=list');
      const data = await response.json();
      setIngredients(data.drinks);
    };
    getIngredients();
  }, []);

  async function handleClick(ingredient) {
    setSearchIngredients(await getRecipeByIngredient('bebidas', ingredient));
    history.push('/bebidas');
  }

  return (
    <div>
      <Header title="Explorar Ingredientes" showSearch={ false } />
      <div className="card-container">
        {
          ingredients.map((drink, index) => (
            (index < limits) && (
              <button
                name={ drink.strIngredient1 }
                type="button"
                onClick={ ({ target: { name } }) => handleClick(name) }
              >
                <div className="card-style">
                  <div className="card-img" data-testid={ `${index}-ingredient-card` }>
                    <img
                      name={ drink.strIngredient1 }
                      src={ `https://www.thecocktaildb.com/images/ingredients/${drink.strIngredient1}-Small.png` }
                      data-testid={ `${index}-card-img` }
                      alt={ drink.strIngredient1 }
                    />
                  </div>
                  <div name={ drink.strIngredient1 } className="card-title">
                    <span
                      data-testid={ `${index}-card-name` }
                    >
                      { drink.strIngredient1 }
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

export default ExploreDrinkIngredients;
