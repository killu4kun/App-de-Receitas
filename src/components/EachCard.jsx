import React from 'react';

function EachCard({ imgsrc, cardName, index, onclick }) {
  return (
    <button className="eachFood" type="button" onClick={ onclick }>
      <img
        className="foodImage"
        src={ imgsrc }
        alt="Recipe thumbnail"
        data-testid={ `${index}-card-img` }
      />
      <p data-testid={ `${index}-card-name` }>
        { cardName }
      </p>
    </button>
  );
}

export default EachCard;
