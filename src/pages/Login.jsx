import React, { useState } from 'react';
import Input from '../components/Input';

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
      <Input
        type="button"
        data-testId="button-input"
        name="button"
        value="Logar"
      />
    </div>
  );
}

export default Login;
