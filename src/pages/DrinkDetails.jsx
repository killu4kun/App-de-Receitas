import React, { useContext, useEffect } from 'react';
import PropTypes from 'prop-types';
import RecipeContext from '../context/RecipeContext';
import DrinkDetailsCard from '../components/DrinkDetailsCard';

function DrinkDetails(props) {
  const {
    // setShowSearchInput,
    recipeID,
    setRecipeID,
    setID } = useContext(RecipeContext);
  const { match } = props;
  const { params } = match;
  const { id } = params; // ? precisa disso mesmo?

  useEffect(() => {
    function handleHeader() {
      // setShowSearchInput(false);
      setID(id);
    }
    handleHeader();
  }, []);

  useEffect(() => {
    async function fetchDrinkID() { // requisição da API com base no ID
      const responseResolve = await (await fetch(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`)).json();
      setRecipeID(...responseResolve.drinks);
    }
    fetchDrinkID();
  }, []);

  return (
    <div>
      {recipeID !== '' ? <DrinkDetailsCard /> : <p>Loading...</p> }
    </div>
  );
}

DrinkDetails.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string.isRequired,
    }),
  }).isRequired,
};

export default DrinkDetails;
