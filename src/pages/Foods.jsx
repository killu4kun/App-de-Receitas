import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import SearchBar from '../components/SearchBar';
import '../css/foods.css';

function Food() {
  return (
    <div>
      <Header title="Comidas" showSearch="true" />
      <SearchBar />
      <div className="foods-container">
        <p>pagina</p>
      </div>
      <Footer />
    </div>
  );
}

export default Food;
