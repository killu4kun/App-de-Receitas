import React, { useState } from 'react';
import Input from '../components/Input';
import Button from '../components/Button';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (
    <div>
      <Input
        type="email"
        data-testId="email-input"
        name="email"
      // value={ email }
      // onChange={({target: { value }}) => setEmail(value)}
      />
      <Input
        type="password"
        data-testId="password-input"
        name="password"
      // value={ password }
      />
      <Button
        text="Logar"
        data-testId="button-input"
        // noClick={ handleClick }
      />
    </div>
  );
}

export default Login;
