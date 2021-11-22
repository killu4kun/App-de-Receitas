import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import ContainerExplorar from '../components/ContainerExplorar';

function ExploreDrinks() {
  return (
    <div>
      <Header title="Explorar Bebidas" showSearch={ false } />
      <ContainerExplorar type="bebidas" />
      <Footer />
    </div>
  );
}

export default ExploreDrinks;
