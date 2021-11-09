import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';

function DoneRecipes() {
  return (
    <div>
      <Header title="Receitas Feitas" showSearch={ false } />
      <h1> DoneRecipese </h1>
      <Footer />
    </div>
  );
}

export default DoneRecipes;
