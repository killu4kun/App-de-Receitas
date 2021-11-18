// Base search

const BASE_URL_ALL_CATEGORY_MEAL = 'https://www.themealdb.com/api/json/v1/1/list.php?c=list';
const BASE_URL_ALL_AREAS_MEAL = 'https://www.themealdb.com/api/json/v1/1/list.php?a=list';
const BASE_URL_ALL_INGREDIENTS_MEAL = 'https://www.themealdb.com/api/json/v1/1/list.php?i=list';
const BASE_URL_IMAGE_INGREDIENTS = 'https://www.themealdb.com/images/ingredients/';

const BASE_URL_ALL_CATEGORY_COCKTAIL = 'https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list';
const BASE_URL_ALL_AREAS_COCKTAIL = 'https://www.thecocktaildb.com/api/json/v1/1/list.php?a=list';
const BASE_URL_ALL_INGREDIENTS_COCKTAIL = 'https://www.thecocktaildb.com/api/json/v1/1/list.php?i=list';

// Meals search endpoints

const SEARCH_FOR_INGREDIENT_MEAL = 'https://www.themealdb.com/api/json/v1/1/filter.php?i=';
const SEARCH_FOR_NAME_MEAL = 'https://www.themealdb.com/api/json/v1/1/search.php?s=';
const SEARCH_FOR_FIRST_LETTER_MEAL = 'https://www.themealdb.com/api/json/v1/1/search.php?f=';

// Drinks search endpoints
const SEARCH_FOR_NAME_COCKTAIL = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=';
const SEARCH_FOR_INGREDIENT_COCKTAIL = 'https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=';
const SEARCH_FOR_FIRST_LETTER_COCKTAIL = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?f=';

// List of all async API requests

export const getAllCategoriesMeal = async () => {
  const results = await fetch(BASE_URL_ALL_CATEGORY_MEAL);
  const response = await results.json();
  return response.meals;
};

export const getAllAreasMeal = async () => {
  const results = await fetch(BASE_URL_ALL_AREAS_MEAL);
  const response = await results.json();
  return response.meals;
};

export const getAllIngredientsDrinks = async () => {
  const results = await fetch(BASE_URL_ALL_INGREDIENTS_COCKTAIL);
  const response = await results.json();
  return response.drinks;
};

export const getAllCategoriesDrinks = async () => {
  const results = await fetch(BASE_URL_ALL_CATEGORY_COCKTAIL);
  const response = await results.json();
  return response.drinks;
};

export const getAllAreasDrinks = async () => {
  const results = await fetch(BASE_URL_ALL_AREAS_COCKTAIL);
  const response = await results.json();
  return response.drinks;
};

export const getAllIngredientsMeal = async () => {
  const results = await fetch(BASE_URL_ALL_INGREDIENTS_MEAL);
  const response = await results.json();
  return response.meals;
};

export const getImageIngredient = async (ingredientName) => {
  const ingredientImage = await fetch(BASE_URL_IMAGE_INGREDIENTS + ingredientName);
  return ingredientImage;
};

export const getRecipeByIngredient = async (type, ingredientName) => {
  if (type === 'bebidas') {
    const results = await fetch(SEARCH_FOR_INGREDIENT_COCKTAIL + ingredientName);
    const response = await results.json();
    return response.drinks;
  }

  if (type === 'comidas') {
    const results = await fetch(SEARCH_FOR_INGREDIENT_MEAL + ingredientName);
    const response = await results.json();
    return response.meals;
  }
};

export const getRecipeByName = async (type, ingredientName) => {
  if (type === 'bebidas') {
    const results = await fetch(SEARCH_FOR_NAME_COCKTAIL + ingredientName);
    const response = await results.json();
    return response.drinks;
  }

  if (type === 'comidas') {
    const results = await fetch(SEARCH_FOR_NAME_MEAL + ingredientName);
    const response = await results.json();
    return response.meals;
  }
};

export const getRecipeByFirstLetter = async (type, ingredientName) => {
  if (type === 'bebidas') {
    const results = await fetch(SEARCH_FOR_FIRST_LETTER_COCKTAIL + ingredientName);
    const response = await results.json();
    return response.drinks;
  }

  if (type === 'comidas') {
    const results = await fetch(SEARCH_FOR_FIRST_LETTER_MEAL + ingredientName);
    const response = await results.json();
    return response.meals;
  }
};

export async function fetchApi(url, food) {
  const response = await fetch(url);
  const resolve = await response.json();
  if (food) {
    return resolve.meals;
  }
  return resolve.drinks;
}

// bebida

// Na tela de bebidas, se o radio selecionado for Ingrediente, a busca na API é feita corretamente pelo ingrediente. O endpoint utilizado deve ser https://www.thecocktaildb.com/api/json/v1/1/filter.php?i={ingrediente};
// Na tela de bebidas, se o radio selecionado for Nome, a busca na API é feita corretamente pelo nome. O endpoint utilizado deve ser https://www.thecocktaildb.com/api/json/v1/1/search.php?s={nome};
// Na tela de bebidas, se o radio selecionado for Primeira letra, a busca na API é feita corretamente pela primeira letra. O endpoint utilizado deve ser https://www.thecocktaildb.com/api/json/v1/1/search.php?f={primeira-letra};
// Na tela de bebidas, se o radio selecionado for Primeira letra e a busca na API for feita com mais de uma letra, deve-se exibir um alert com a mensgem "Sua busca deve conter somente 1 (um) caracter".

// comida

// Se o radio selecionado for Ingrediente, a busca na API é feita corretamente pelo ingrediente. O endpoint utilizado deve ser https://www.themealdb.com/api/json/v1/1/filter.php?i={ingrediente};
// Se o radio selecionado for Nome, a busca na API é feita corretamente pelo nome. O endpoint utilizado deve ser https://www.themealdb.com/api/json/v1/1/search.php?s={nome};
// Se o radio selecionado for Primeira letra, a busca na API é feita corretamente pela primeira letra. O endpoint utilizado deve ser https://www.themealdb.com/api/json/v1/1/search.php?f={primeira-letra};
// Se o radio selecionado for Primeira letra e a busca na API for feita com mais de uma letra, deve-se exibir um alert com a mensgem "Sua busca deve conter somente 1 (um) caracter".
