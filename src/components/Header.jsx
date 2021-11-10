import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import profileIcon from '../images/profileIcon.svg';
import searchIcon from '../images/searchIcon.svg';
import '../css/header.css';
import RecipeContext from '../context/RecipeContext';

function Header({ title, showSearch }) {
  const { handleSearchButtonClick } = useContext(RecipeContext);
  const callButton = () => (
    <button
      type="button"
      onClick={ () => handleSearchButtonClick() }
    >
      <img
        src={ searchIcon }
        alt="Search"
        data-testid="search-top-btn"
      />
    </button>
  );

  const history = useHistory();
  return (
    <header className="header-container">
      <button
        type="button"
        onClick={ () => history.push('/perfil') }
      >
        <img
          src={ profileIcon }
          alt="Profile"
          data-testid="profile-top-btn"
        />
      </button>
      <h1 data-testid="page-title">{title}</h1>
      {showSearch
        && callButton()}
    </header>
  );
}

Header.propTypes = {
  title: PropTypes.string.isRequired,
  showSearch: PropTypes.bool.isRequired,
};

export default Header;
