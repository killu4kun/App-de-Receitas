import React,{useState,useEffect} from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { fetchApi } from '../services/recipesRequest';


function ExploreFoodArea() {
  const [areas, setAreas] = useState([]);
  const [meals, setMeals] = useState([]);
  const [selectedArea, setSelectedArea] = useState('');
  const maxResults = 12;

  async function fetchAreas() {
    const response = await fetch('https://www.themealdb.com/api/json/v1/1/list.php?a=list');
    const result = await response.json();
    return setAreas(result.meals);
  }

  async function renderMeals() {
    const resultApi = await fetchApi('https://www.themealdb.com/api/json/v1/1/filter.php?i', true);
    setMeals(resultApi);
  }

  async function fetchMealsByOrigem(origem) {
    const response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?a=${origem}`);
    const result = await response.json();
    return setMeals(result.meals);
  }

  useEffect(() => {
    fetchAreas();
    renderMeals();
  }, []);

  useEffect(() => {
    if (selectedArea === 'All') {
      renderMeals();
    }

    if (selectedArea && selectedArea !== 'All') {
      fetchMealsByOrigem(selectedArea);
    }
  }, [selectedArea]);

  return (
    <div>
      <Header title="Explorar Origem" showSearch />
      <div>
        <select
          data-testid="explore-by-area-dropdown"
          name="selectedArea"
          value={ selectedArea }
          onChange={ ({ target }) => setSelectedArea(target.value) }
        >
          <option data-testid="All-option" value="All">All</option>
          {areas.map(({ strArea }) => (
            <option
              data-testid={ `${strArea}-option` }
              key={ strArea }
              value={ strArea }
            >
              {strArea}
            </option>
          ))}
        </select>
      </div>
      <div className="card-container">
        {meals.slice(0, maxResults).map(({ idMeal, strMeal, strMealThumb }, index) => (
          <Link
            to={ `/comidas/${idMeal}` }
            key={ idMeal }
            className="card"
          >
            <div className="card-style" data-testid={ `${index}-recipe-card` }>
              <img
                src={ strMealThumb }
                alt={ strMeal }
                data-testid={ `${index}-card-img` }
                className="card-image"
              />
              <h3
                data-testid={ `${index}-card-name` }
                className="card-title"
              >
                { strMeal }
              </h3>
            </div>
          </Link>
        ))}
      </div>
      <Footer />
    </div>
  );
}

export default ExploreFoodArea;
