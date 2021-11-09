import React, { useContext } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import SearchBar from '../components/SearchBar';
import '../css/foods.css';
import RecipeContext from '../context/RecipeContext';

function Food() {
  const { searchIngredients, mealsRecipes } = useContext(RecipeContext);

  return (
    <div>
      <Header title="Comidas" showSearch />
      <SearchBar />
      <div className="foods-container">
        <nav>
          lado
        </nav>
        <main>
          meio
        </main>
      </div>
      <Footer />
    </div>
  );
}

export default Food;
