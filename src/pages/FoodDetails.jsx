import React, { useContext, useEffect } from 'react';
import PropTypes from 'prop-types';
import FoodDetailCard from '../components/FoodDetailsCard';
import RecipeContext from '../context/RecipeContext';

function FoodDetails(props) {
  const {
    // setShowSearchInput, // mostar ou nao busca
    recipeID,
    setRecipeID,
    setID } = useContext(RecipeContext);
  const { match } = props;
  const { params } = match;
  const { id } = params;

  useEffect(() => {
    function handleHeader() {
      // setShowSearchInput(false);
      setID(id);
    }
    handleHeader();
  }, []);

  useEffect(() => {
    async function fetchMealID() {
      const responseResolve = await (await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`)).json();
      setRecipeID(...responseResolve.meals); // requisição da API pelo id para retorno do estado global
    }
    fetchMealID();
  }, []);

  return (
    <div>
      {recipeID !== '' ? <FoodDetailCard /> : <p>Loading...</p> }
    </div>
  );
}

FoodDetails.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string.isRequired,
    }),
  }).isRequired,
};

export default FoodDetails;
