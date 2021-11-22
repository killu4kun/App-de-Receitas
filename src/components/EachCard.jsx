import React from 'react';
import { Card } from 'react-bootstrap';
import PropTypes from 'prop-types';

function EachCard({ imgsrc, cardName, index, onclick }) {
  return (
    <Card style={ { width: '25rem', cursor: 'pointer' } } onClick={ onclick }>
      <Card.Img
        variant="top"
        src={ imgsrc }
        alt="Recipe thumbnail"
        data-testid={ `${index}-card-img` }
      />
      <Card.Header data-testid={ `${index}-card-name` }>
        { cardName }
      </Card.Header>
    </Card>
    // <button className="eachFood" type="button" onClick={ onclick }>
    //   <img
    //     className="foodImage"
    //     src={ imgsrc }
    //     alt="Recipe thumbnail"
    //     data-testid={ `${index}-card-img` }
    //   />
    //   <p data-testid={ `${index}-card-name` }>
    //     { cardName }
    //   </p>
    // </button>
  );
}

EachCard.propTypes = {
  imgsrc: PropTypes.string.isRequired,
  cardName: PropTypes.string.isRequired,
  index: PropTypes.number.isRequired,
  onclick: PropTypes.func,
};

EachCard.defaultProps = {
  onclick: () => {},
};

export default EachCard;
