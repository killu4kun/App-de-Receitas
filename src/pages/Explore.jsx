import React from 'react';
import { useHistory } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';

function Explore() {
  const history = useHistory();
  function handleClick(param) {
    history.push(param);
  }
  return (
    <div>
      <Header title="Explorar" showSearch={ false } />
      <button
        type="button"
        onClick={ () => handleClick('/explorar/comidas') }
        data-testid="explore-food"
      >
        Explorar Comidas
      </button>
      <button
        type="button"
        onClick={ () => handleClick('/explorar/bebidas') }
        data-testid="explore-drinks"
      >
        Explorar Bebidas
      </button>
      <Footer />
    </div>
  );
}

export default Explore;
