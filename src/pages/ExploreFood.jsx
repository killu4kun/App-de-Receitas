import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import ContainerExplorar from '../components/ContainerExplorar';

function ExploreFood() {
  return (
    <div>
      <Header title="Explorar Comida" showSearch={ false } />
      <ContainerExplorar type="comidas" />
      <Footer />
    </div>
  );
}

export default ExploreFood;
