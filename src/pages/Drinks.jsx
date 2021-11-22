import React, { useContext } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import SearchBar from '../components/SearchBar';
import '../css/foods.css';
import RecipeContext from '../context/RecipeContext';
import EveryDrinkCard from '../components/everyDrinkCard';
import CategoryButtons from '../components/CategoryButtons';

function Drinks() {
  const { loading, loadingCategories,
    showSearchBar } = useContext(RecipeContext);
  return (
    <div>
      <Header title="Bebidas" showSearch />
      { showSearchBar ? <SearchBar /> : null}
      { loadingCategories ? <CategoryButtons title="Bebidas" /> : null}
      <div className="foods-container">
        { loading ? <p>LOADING...</p> : <EveryDrinkCard /> }
      </div>
      <Footer />
    </div>
  );
}

export default Drinks;
