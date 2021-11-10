import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';

const SLICE_EMAIL = 10;

function Profile() {
  const [retrieveEmail, setRetrieveEmail] = useState('');
  
  useEffect(() => {
    const user = localStorage.getItem('user'); // "email":"asidjnsuiahn@asjduioashd.com"
    console.log(user);
    if (user !== null) {
      console.log(JSON.parse(user).email);
      setRetrieveEmail(user);
    } else {
      setRetrieveEmail('');
    }
  }, []);
  
  const history = useHistory();
  
  return (
    <div>
      <Header title="Perfil" showSearch={ false } />
      <h1 data-testid="profile-email">
        { retrieveEmail.length !== 0
        && retrieveEmail.slice(SLICE_EMAIL, retrieveEmail.length - 2) }
      </h1>
      <button
        type="button"
        data-testid="profile-done-btn"
        onClick={ () => history.push('/receitas-feitas') }
      >
        Receitas Feitas
      </button>
      <button
        type="button"
        data-testid="profile-favorite-btn"
        onClick={ () => history.push('/receitas-favoritas') }
      >
        Receitas Favoritas
      </button>
      <button
        type="button"
        data-testid="profile-logout-btn"
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
