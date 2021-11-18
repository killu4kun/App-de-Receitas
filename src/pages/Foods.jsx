import React, { useContext } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import SearchBar from '../components/SearchBar';
import RecipeContext from '../context/RecipeContext';
import EveryMealCard from '../components/EveryMealCard';

function Food() {
  const { loading,
    showSearchBar } = useContext(RecipeContext);
  return (
    <div>
      <Header title="Comidas" showSearch />
      { showSearchBar ? <SearchBar /> : null}
      <div className="foods-container">
        { loading ? <p>LOADING...</p> : <EveryMealCard /> }
      </div>
      <Footer />
    </div>
  );
}

export default Food;
