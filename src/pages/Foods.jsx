import React, { useContext } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import SearchBar from '../components/SearchBar';
import '../css/foods.css';
import RecipeContext from '../context/RecipeContext';

function Food() {
  const { foodsCategories, foodsIngredients } = useContext(RecipeContext);
  console.log(foodsCategories);
  console.log(foodsIngredients);

  return (
    <div>
      <Header title="Comidas" showSearch />
      <SearchBar />
      <div className="foods-container">
        <nav>
          <ul>
            {foodsCategories
              .map((food, index) => Object.values(food)
                .map((value) => (<li key={ index }>{value}</li>)))}
          </ul>
        </nav>
        <main>
          {foodsIngredients
            .length !== 0 && foodsIngredients
            .map((ingredient) => ingredient.strIngredient)}
        </main>
      </div>
      <Footer />
    </div>
  );
}

export default Food;
