export function handleToShareBtn(target, Id, type) {
  const initialLink = 'http://localhost:3000/';
  const copyText = `${initialLink}${type}s/${Id}`;
  window.navigator.clipboard.writeText(copyText);
  if (target.parentNode.innerHTML === '<div>Link copiado!</div>') { // rever esta logica
    // empty
  } else {
    target.parentNode.innerHTML = '<div>Link copiado!<div>';
  }
}

// target.parentNode.innerHTML === copyText

// https://developer.mozilla.org/en-US/docs/Web/API/Clipboard/writeText
// https://www.javascripttutorial.net/javascript-bom/javascript-navigator/

export function favoritedItem(id) {
  const favoritedStorage = JSON.parse(localStorage.getItem('favoriteRecipes'));
  if (favoritedStorage !== undefined && favoritedStorage !== null) {
    const isFavorited = favoritedStorage.some((recipe) => recipe.id === id);
    return isFavorited;
  }
}

export function handleFavoritedBtn(recipeID, Id, type, func) {
  const favoriteRecipe = {
    id: recipeID.idDrink || recipeID.idMeal,
    type,
    area: recipeID.strArea || '',
    category: recipeID.strCategory || '',
    alcoholicOrNot: recipeID.strAlcoholic || '',
    name: recipeID.strDrink || recipeID.strMeal,
    image: recipeID.strDrinkThumb || recipeID.strMealThumb,
  };

  if (!localStorage.getItem('favoriteRecipes')) {
    localStorage.setItem('favoriteRecipes', JSON.stringify([]));
  }
  const isRecipeFavorited = JSON.parse(localStorage.getItem('favoriteRecipes'))
    .some((recipe) => recipe.id === Id); // verifica se a receita ja esta no favoritos
  if (isRecipeFavorited) {
    const localRecipes = JSON.parse(localStorage.getItem('favoriteRecipes'));
    const filteredRecipes = localRecipes.filter((recipe) => recipe.id !== Id);
    func(filteredRecipes);
    localStorage.setItem('favoriteRecipes', JSON.stringify(filteredRecipes));
  } else {
    const localRecipes = JSON.parse(localStorage.getItem('favoriteRecipes'));
    localRecipes.push(favoriteRecipe);
    func(localRecipes);
    localStorage.setItem('favoriteRecipes', JSON.stringify(localRecipes));
  }
}

// export function handleKeyInLocalStorage(key, id) {
//   const textButton = Object.keys(key).some((item) => item.id === id)
//     ? 'Continuar Receita' : 'Iniciar Receita';
//   return textButton;
// }

export const setDate = () => {
  // implementação da data obtida através de código visto em:
  // https://www.horadecodar.com.br/2021/04/03/como-pegar-a-data-atual-com-javascript/
  const date = new Date();
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const year = date.getFullYear();
  const presentDate = `${day}/${month}/${year}`;
  return presentDate;
};

// The some() method tests whether at least one element in the array passes the test implemented by the provided function

// a chave favoriteRecipes deve conter a seguinte estrutura:
// [{
//     id: id-da-receita,
//     type: comida-ou-bebida,
//     area: area-da-receita-ou-texto-vazio,
//     category: categoria-da-receita-ou-texto-vazio,
//     alcoholicOrNot: alcoholic-ou-non-alcoholic-ou-texto-vazio,
//     name: nome-da-receita,
//     image: imagem-da-receita
// }]
