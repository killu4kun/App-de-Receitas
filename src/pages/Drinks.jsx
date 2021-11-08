import React, { useContext } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import SearchBar from '../components/SearchBar';
import '../css/foods.css';
import RecipeContext from '../context/RecipeContext';

function Drinks() {
  const { drinksCategories, drinksIngredients } = useContext(RecipeContext);
  return (
    <div>
      <Header title="Bebidas" showSearch />
      <SearchBar />
      <div className="drinks-container">
        <nav>
          <ul>
            {drinksCategories
              .map((drink, index) => Object.values(drink)
                .map((value) => (<li key={ index }>{value}</li>)))}
          </ul>
        </nav>
        <main>
          {drinksIngredients
            .length !== 0 && drinksIngredients
            .map((ingredient) => ingredient.strIngredient1)}
        </main>
      </div>
      <Footer />
    </div>
  );
}

export default Drinks;
