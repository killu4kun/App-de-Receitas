import React, { useContext } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import SearchBar from '../components/SearchBar';
import '../css/foods.css';
import RecipeContext from '../context/RecipeContext';
import EveryMealCard from '../components/everyMealCard';
import CategoryButtons from '../components/CategoryButtons';

function Food() {
  const { loading,
    showSearchBar, loadingCategories } = useContext(RecipeContext);
  return (
    <div>
      <Header title="Comidas" showSearch />
      { showSearchBar ? <SearchBar /> : null}
      { loadingCategories ? <CategoryButtons title="Comidas" /> : null}
      <div className="foods-container">
        { loading ? <p>LOADING...</p> : <EveryMealCard /> }
      </div>
      <Footer />
    </div>
  );
}

export default Food;
