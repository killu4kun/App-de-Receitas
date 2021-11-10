import React from 'react';
import { useHistory } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';

function ExploreFood() {
  const history = useHistory();
  return (
    <div>
      <Header title="Explorar Comida" showSearch={ false } />
      <button
        type="button"
        onClick={ () => history.push('/explorar/comidas/ingredientes') }
        data-testid="explore-by-ingredient"
      >
        Por Ingredientes
      </button>
      <button
        type="button"
        onClick={ () => history.push('/explorar/comidas/area') }
        data-testid="explore-by-area"
      >
        Por Local de Origem
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

export default ExploreFood;
