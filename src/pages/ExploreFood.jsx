import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';

function ExploreFood() {
  return (
    <div>
      <Header title="Explorar Comida" showSearch={ false } />
      <h1> ExploreFood </h1>
      <Footer />
    </div>
  );
}

export default ExploreFood;
