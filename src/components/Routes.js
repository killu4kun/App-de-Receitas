import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Login from '../pages/Login';
import Foods from '../pages/Foods';
import Drinks from '../pages/Drinks';
import Profile from '../pages/Profile';
import Explore from '../pages/Explore';
import FoodRecipe from '../pages/FoodRecipe';
import DrinkRecipe from '../pages/DrinkRecipe';
import FoodInProgress from '../pages/FoodInProgress';
import DrinkInProgress from '../pages/DrinkInProgress';
import ExploreDrinks from '../pages/ExploreDrinks';
import ExploreFood from '../pages/ExploreFood';
import ExploreFoodIngredients from '../pages/ExploreFoodIngredients';
import ExploreDrinkIngredients from '../pages/ExploreDrinkIngredients';
import ExploreFoodArea from '../pages/ExploreFoodArea';
import DoneRecipes from '../pages/DoneRecipes';
import FavoriteRecipes from '../pages/FavoriteRecipes';

export default function Routes() {
  return (
    <Switch>
      <Route exact path="/" component={ Login } />
      <Route exact path="/comidas" component={ Foods } />
      <Route exact path="/bebidas" component={ Drinks } />
      <Route exact path="/comidas/{id-da-receita}" component={ FoodRecipe } />
      <Route exact path="/bebidas/{id-da-receita}" component={ DrinkRecipe } />
      {/* <Route exact path="/comidas/{id-da-receita}/in-progress" component={ FoodInProgress } /> */}
      {/* <Route exact path="/bebidas/{id-da-receita}/in-progress" component={ DrinkInProgress } /> */}
      <Route exact path="/explorar" component={ Explore } />
      {/* <Route exact path="/explorar/comidas" component={ ExploreFood } /> */}
      {/* <Route exact path="/explorar/bebidas" component={ ExploreDrinks } /> */}
      {/* <Route exact path="/explorar/comidas/ingredientes" component={ ExploreFoodIngredients } /> */}
      {/* <Route exact path="/explorar/bebidas/ingredientes" component={ ExploreDrinkIngredients } /> */}
      {/* <Route exact path="/explorar/comidas/area" component={ ExploreFoodArea } /> */}
      <Route exact path="/perfil" component={ Profile } />
      {/* <Route exact path="/receitas-feitas" component={ DoneRecipes } /> */}
      {/* <Route exact path="/receitas-favoritas" component={ FavoriteRecipes } /> */}
    </Switch>
  );
}
