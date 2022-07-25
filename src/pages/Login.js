import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import Input from '../components/Login/Input';
import Button from '../components/Login/Button';
import './pagesCss/Login.css';

function Login() {
  const history = useHistory();
  const [user, setUser] = useState({
    email: 'teste@teste.com',
    password: '12345678',
  });
  const validateEmail = /\S+@\S+\.\S+/;
  const MIN_LENGTH_PASSWORD = 7;

  const handleClick = () => {
    localStorage.setItem('mealsToken', 1);
    localStorage.setItem('cocktailsToken', 1);
    localStorage.setItem('user', JSON.stringify({ email: user.email }));
    history.push('/foods');
  };

  const handleChange = ({ target }) => {
    const { value, name } = target;
    setUser({
      ...user,
      [name]: value,
    });
  };

  return (
    <main className="mainLogin">
      <h1 className="nameApp">App de Receitas</h1>
      <form className="formLogin">
        <Input
          type="email"
          name="email"
          value={ user.email }
          onChange={ handleChange }
          testeId="email-input"
          text="Email"
        />
        <Input
          type="password"
          name="password"
          value={ user.password }
          onChange={ handleChange }
          testeId="password-input"
          text="Password"
        />
        <Button
          testId="login-submit-btn"
          handleClick={ handleClick }
          buttonText="Enter"
          disabled={
            user.password.length < MIN_LENGTH_PASSWORD || !validateEmail.test(user.email)
          }
        />
      </form>
    </main>
  );
}

export default Login;
