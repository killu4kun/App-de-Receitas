import React from 'react';
import profileIcon from '../images/profileIcon.svg';
import searchIcon from '../images/searchIcon.svg';

function Header() {
  return (
    <header>
      <img
        src={ profileIcon }
        alt="Profile"
        data-testid="profile-top-btn"
      />
      <h1 data-testid="page-title">Comidas</h1>
      <img
        src={ searchIcon }
        alt="Search"
        data-testid="search-top-btn"
      />
    </header>
  );
}

export default Header;
