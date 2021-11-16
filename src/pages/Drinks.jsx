import React, { useContext } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import SearchBar from '../components/SearchBar';
import '../css/foods.css';
import RecipeContext from '../context/RecipeContext';
import EveryDrinkCard from '../components/everyDrinkCard';

function Drinks() {
  const { loading,
    showSearchBar } = useContext(RecipeContext);
  return (
    <div>
      <Header title="Bebidas" showSearch />
      { showSearchBar ? <SearchBar /> : null}
      <div className="foods-container">
        { loading ? <p>LOADING...</p> : <EveryDrinkCard /> }
      </div>
      <Footer />
    </div>
  );
}

export default Drinks;
