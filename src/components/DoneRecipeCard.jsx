// a chave doneRecipes deve conter a seguinte estrutura:
// [{
//     id: id-da-receita,
//     type: comida-ou-bebida,
//     area: area-da-receita-ou-texto-vazio,
//     category: categoria-da-receita-ou-texto-vazio,
//     alcoholicOrNot: alcoholic-ou-non-alcoholic-ou-texto-vazio,
//     name: nome-da-receita,
//     image: imagem-da-receita,
//     doneDate: quando-a-receita-foi-concluida,
//     tags: array-de-tags-da-receita-ou-array-vazio
// }]
import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import Context from '../context/RecipeContext';
import ShareIcon from '../images/shareIcon.svg';
import { handleToShareBtn } from '../services/utilityFunctions';

function DoneRecipeCards() {
  const doneRecipesLocalStorage = JSON.parse(localStorage.getItem('doneRecipes'));
  const { doneRecipesFilter } = useContext(Context); // doneRecipesFilter é o esatdo para armazenar os tipos de filtro
  // o estado de doneRecipesFilter vai ser definido no clique da página de receitas prontas (/pages/DoneRecipes)
  // com o clique o estado e definido para ser utilizado na funçao de filtro
  // Redirecione para a tela de detalhes da receita caso seja clicado na foto ou no nome da receita

  // comida e drink vao no singular devido ao formato de construção do local storage

  return (
    <div>
      { doneRecipesLocalStorage.filter((recipe) => ( // filtro do que esta armazenado no localstorage
        recipe.type !== doneRecipesFilter)) // se o tipo do filtro for igual o tipo da receita, filtra/ o filtro começa como all (valor '') setado
        // no estado inicial
        .map((recipe, index) => ( // por ser singular lancei o "s" depois do tipo
          <div key={ recipe.id }>
            <Link to={ `/${recipe.type}s/${recipe.id}` }>
              <img
                data-testid={ `${index}-horizontal-image` }
                src={ recipe.image }
                alt={ recipe.name }
              />
            </Link>
            <p
              data-testid={ `${index}-horizontal-top-text` }
            >
              { recipe.type === 'comida' // aqui define a diferença de retorno se for comida ou bebida
                ? `${recipe.area} - ${recipe.category}`
                : `${recipe.alcoholicOrNot} - ${recipe.category}` }
            </p>
            <button
              type="button"
              data-testid={ `${index}-horizontal-share-btn` }
              onClick={ ({ target }) => handleToShareBtn(target, recipe.id, recipe.type) }
              text="Compartilhar receita"
              src={ ShareIcon }
              alt="compartilhar receita"
            >
              <img src={ ShareIcon } alt="compartilhar" />
            </button>
            <Link to={ `/${recipe.type}s/${recipe.id}` }>
              <h3 data-testid={ `${index}-horizontal-name` }>{ recipe.name }</h3>
            </Link>
            <h4 data-testid={ `${index}-horizontal-done-date` }>{ recipe.doneDate }</h4>
            <div>
              {recipe.tags.map((tag, index2) => (
                index < 2 //  as 2 primeiras tags retornadas
                  ? (
                    <p
                      data-testid={ `${index}-${tag}-horizontal-tag` }
                      key={ index2 }
                    >
                      { tag }
                    </p>
                  ) : null
              )) }
            </div>
          </div>
        )) }
    </div>
  );
}

export default DoneRecipeCards;
