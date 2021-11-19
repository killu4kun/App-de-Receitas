import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { Button,
  Container,
  Form,
  Col,
} from 'react-bootstrap';

function Login() {
  const [userEmail, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [validate, setValidate] = useState(false);
  const history = useHistory();
  const MIN_PASSWORD_LENGTH = 6;

  // função do projeto trybewallet, usando regex
  const isEmailValid = (email) => {
    const regexEmail = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/;
    return regexEmail.test(email);
  };

  useEffect(() => {
    const handleValidate = () => {
      if (isEmailValid(userEmail) && password.length > MIN_PASSWORD_LENGTH) {
        setValidate(true);
      } else {
        setValidate(false);
      }
    };
    handleValidate();
  }, [userEmail, password]);

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
    <Container fluid>
      <Col className="my-5" xs={ { span: 'auto' } } md={ 8 }>
        <Form validated={ validate }>
          <Form.Group className="mb-3" controlId="email">
            <Form.Label htmlFor="name">Email</Form.Label>
            <Form.Control
              required
              dataTestId="email-input"
              type="email"
              placeholder="Insira seu e-mail"
              onChange={ ({ target: { value } }) => setEmail(value) }
            />
            { !isEmailValid(userEmail)
              ? (
                <Form.Text type="invalid">
                  Insira um e-mail válido
                </Form.Text>
              )
              : ''}
          </Form.Group>
          <Form.Group className="mb-3" controlId="password">
            <Form.Label htmlFor="password">Password</Form.Label>
            <Form.Control
              required
              dataTestId="password-input"
              type="password"
              placeholder="Insira sua senha"
              onChange={ ({ target: { value } }) => setPassword(value) }
            />
            { !validate
              ? (
                <Form.Text type="invalid">
                  Insira uma senha com o mínimo de 6 caracteres
                </Form.Text>
              )
              : (
                <Form.Text className="text-success">
                  Senha válida
                </Form.Text>
              )}
          </Form.Group>
          <section className="d-grid gap-2">
            <Button
              size="lg"
              style={ { cursor: 'pointer' } }
              variant={ !validate ? 'danger' : 'primary' }
              dataTestId="login-submit-btn"
              disabled={ !validate }
              onClick={ () => handleClick() }
            >
              Logar
            </Button>
          </section>
        </Form>

      </Col>
    </Container>
  );
}

export default Login;
