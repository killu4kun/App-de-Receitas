import React from 'react';
import { useHistory } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';

function Profile() {
  const { email } = JSON.parse(localStorage.getItem('user'));
  const history = useHistory();
  return (
    <div>
      <Header title="Perfil" showSearch={ false } />
      <h1>
        { email }
      </h1>
      <button type="button" onClick={ () => history.push('/receitas-feitas') }>
        Receitas Feitas
      </button>
      <button type="button" onClick={ () => history.push('/receitas-favoritas') }>
        Receitas Favoritas
      </button>
      <button
        type="button"
        onClick={ () => {
          localStorage.clear();
          history.push('/');
        } }
      >
        Sair
      </button>
      <Footer />
    </div>
  );
}

export default Profile;
