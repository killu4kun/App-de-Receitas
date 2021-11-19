import React, { useEffect, useContext } from 'react';
import { useLocation } from 'react-router';
import { Button, Nav, InputGroup, Form, FormControl } from 'react-bootstrap';
import RecipeContext from '../context/RecipeContext';

function SearchBar() {
  const { setLocationName, handleClick,
    handleInputChange, handleRadioChange } = useContext(RecipeContext);
  const { pathname } = useLocation();
  const locationRoute = pathname.slice(1);

  useEffect(() => {
    setLocationName(locationRoute);
  }, []);

  return (
    <Nav fill="true" justify="true">
      <Form>
        <InputGroup>
          <FormControl
            placeholder="O que você deseja comer?"
            aria-label="O que você deseja comer?"
            data-testid="search-input"
            onChange={ ({ target: { value } }) => handleInputChange(value) }
          />
        </InputGroup>
        <Form.Check
          inline
          label="1"
          name="chosen-filter"
          type="radio"
          id="ingredient"
          value="ingredient"
          data-testid="ingredient-search-radio"
          onChange={ ({ target: { value } }) => handleRadioChange(value) }
        />
        <Form.Check
          inline
          label="2"
          name="chosen-filter"
          type="radio"
          id="name"
          value="name"
          data-testid="name-search-radio"
          onChange={ ({ target: { value } }) => handleRadioChange(value) }
        />
        <Form.Check
          inline
          label="3"
          name="chosen-filter"
          type="radio"
          id="first-letter"
          value="first-letter"
          data-testid="first-letter-search-radio"
          onChange={ ({ target: { value } }) => handleRadioChange(value) }
        />

        {/* <label
          htmlFor="chosen-filter"
          onChange={ ({ target: { value } }) => handleRadioChange(value) }
        >
          <Input
            name="chosen-filter"
            type="radio"
            id="ingredient"
            value="ingredient"
            data-testid="ingredient-search-radio"
          />
          Ingrediente
          <Input
            name="chosen-filter"
            type="radio"
            id="name"
            value="name"
            data-testid="name-search-radio"
          />
          Nome */}
        {/* <input
              name="chosen-filter"
              type="radio"
              id="first-letter"
              value="first-letter"
              data-testid="first-letter-search-radio"
            />
            Primeira letra
          </label> */}
        <Button
          text="Buscar"
          variant="outline-sucess"
          onClick={ handleClick }
          dataTestId="exec-search-btn"
        />
      </Form>
    </Nav>
  );
}

export default SearchBar;
