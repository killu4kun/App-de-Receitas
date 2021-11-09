import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';

function Profile() {
  return (
    <div>
      <Header title="Perfil" showSearch={ false } />
      <h1> Profile </h1>
      <Footer />
    </div>
  );
}

export default Profile;