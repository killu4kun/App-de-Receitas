import React from 'react';
import { useHistory } from 'react-router-dom';
import { Navbar, Button } from 'react-bootstrap';
import drinkIcon from '../images/drinkIcon.svg';
import mealIcon from '../images/mealIcon.svg';
import exploreIcon from '../images/exploreIcon.svg';

function Footer() {
  const history = useHistory();
  return (
    <footer data-testid="footer">
      <Navbar bg="orange" expand="lg" fixed="bottom">
        <Button
          variant="light"
          className="footerButtons"
          onClick={ () => history.push('/bebidas') }
          type="button"
          data-testid="drinks-bottom-btn"
          src={ drinkIcon }
          alt="drink-icon"
        >
          <img
            src={ drinkIcon }
            alt="drink Icon"
          />
        </Button>
        <Button
          variant="light"
          onClick={ () => history.push('/explorar') }
          type="button"
          data-testid="explore-bottom-btn"
          src={ exploreIcon }
          alt="explore-icon"
        >
          <img
            src={ exploreIcon }
            alt="Explore Icon"
          />
        </Button>
        <Button
          variant="light"
          onClick={ () => history.push('/comidas') }
          type="button"
          data-testid="food-bottom-btn"
          src={ mealIcon }
          alt="meal-icon"
        >
          <img
            src={ mealIcon }
            alt="meal Icon"
          />
        </Button>
      </Navbar>
    </footer>
  );
}

export default Footer;
