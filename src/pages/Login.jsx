import React, { useState, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import Input from '../components/Input';
import Button from '../components/Button';
import RecipeContext from '../context/RecipeContext';
import '../css/login.css';

function Login() {
  const [userEmail, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [validate, setValidate] = useState(false);
  const history = useHistory();
  const PASSWORD_LENGTH = 6;

  // função do projeto trybewallet, usando regex
  const isEmailValid = (email) => {
    const regexEmail = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/;
    return regexEmail.test(email);
  };

  const handleValidate = () => {
    if (isEmailValid(userEmail) && password.length > PASSWORD_LENGTH - 1) {
      setValidate(true);
    }
  };

  const handleClick = () => {
    const email = {
      email: userEmail,
    };

    localStorage.setItem('mealsToken', 1);
    localStorage.setItem('cocktailsToken', 1);
    localStorage.setItem('user', JSON.stringify(email));

    history.push('/comidas');
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <Input
          type="email"
          dataTestId="email-input"
          name="email"
          onChange={ ({ target: { value } }) => {
            handleValidate();
            setEmail(value);
          } }
        />
        <Input
          type="password"
          dataTestId="password-input"
          name="password"
          onChange={ ({ target: { value } }) => {
            handleValidate();
            setPassword(value);
          } }
        />
        <Button
          text="Logar"
          dataTestId="login-submit-btn"
          disabled={ !validate }
          onClick={ () => handleClick() }
        />
      </div>
    </div>
  );
}

export default Login;
