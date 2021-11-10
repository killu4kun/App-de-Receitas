import React from 'react';
import { useHistory } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';

function Explore() {
  const history = useHistory();
  return (
    <div>
      <Header title="Explorar" showSearch={ false } />
      <button
        type="button"
        onClick={ () => history.push('/explorar/comidas') }
        data-testid="explore-food"
      >
        Explorar Comidas
      </button>
      <button
        type="button"
        onClick={ () => history.push('/explorar/bebidas') }
        data-test-id="explore-drinks"
      >
        Explorar Bebidas
      </button>
      <Footer />
    </div>
  );
}

export default Explore;
