import React from 'react';
import './App.css';
// import rockGlass from './images/rockGlass.svg';
import 'bootstrap/dist/css/bootstrap.min.css';
import Routes from './components/Routes';
import RecipeProvider from './context/RecipeProvider';

function App() {
  return (
    <RecipeProvider>
      <Routes />
    </RecipeProvider>
  );
}

export default App;
