import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Navbar, Button } from 'react-bootstrap';
import RecipeContext from '../context/RecipeContext';
import profileIcon from '../images/profileIcon.svg';
import searchIcon from '../images/searchIcon.svg';

function Header({ title, showSearch }) {
  const { handleSearchButtonClick } = useContext(RecipeContext);
  const callButton = () => (
    <>
      <Navbar.Toggle src={ searchIcon } aria-controls="navbarScroll" />
      <Navbar.Collapse id="navbarScroll" onToggle={ () => handleSearchButtonClick() }>
        <Button
          variant="light"
          type="button"
          onClick={ () => handleSearchButtonClick() }
        >
          <img
            src={ searchIcon }
            alt="Search"
            data-testid="search-top-btn"
          />
        </Button>
      </Navbar.Collapse>
    </>
  );

  const history = useHistory();

  return (
    <Navbar bg="light" expand="lg" fixed="top">
      <Button
        variant="light"
        type="button"
        onClick={ () => history.push('/perfil') }
      >
        <img
          src={ profileIcon }
          alt="Profile"
          data-testid="profile-top-btn"
        />
      </Button>
      <Navbar.Brand className="h1" data-testid="page-title">{title}</Navbar.Brand>
      {showSearch
        && callButton()}
    </Navbar>
  );
}

Header.propTypes = {
  title: PropTypes.string.isRequired,
  showSearch: PropTypes.bool.isRequired,
};

export default Header;
