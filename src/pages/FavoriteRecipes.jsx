import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';

function FavoriteRecipes() {
  return (
    <div>
      <Header title="Receitas Favoritas" showSearch={ false } />
      <h1> FavoriteRecipes </h1>
      <Footer />
    </div>
  );
}

export default FavoriteRecipes;
