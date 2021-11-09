import React from 'react';
import { useHistory } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';

function ExploreDrinks() {
  const history = useHistory();
  return (
    <div>
      <Header title="Explorar Bebidas" showSearch={ false } />
      <button
        type="button"
        onClick={ () => history.push('/explorar/bebidas/ingredientes') }
        data-testid="explore-by-ingredient"
      >
        Por Ingredientes
      </button>
      <button
        type="button"
        testid="explore-surprise"
      >
        Me Surpreenda!
      </button>
      <Footer />
    </div>
  );
}

export default ExploreDrinks;
