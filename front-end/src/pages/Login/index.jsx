import React, { useState } from 'react';
import axios from 'axios';
import { Input, Button } from '../../components';

export default function Login() {
  const [state, setState] = useState({
    email: '',
    isEmailValid: false,
    password: '',
    isPasswordValid: false,
    errorMessage: '',
  });

  function validateEmail({ target: { value } }) {
    const regex = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/i;
    const isValid = regex.test(value);
    console.log(value);
    setState({ ...state, isEmailValid: isValid, email: value });
  }

  function validatePassword({ target: { value } }) {
    const MIN_LENGTH = 6;
    const password = value;
    if (password.length >= MIN_LENGTH) {
      setState({ ...state, isPasswordValid: true, password });
    } else {
      setState({ ...state, isPasswordValid: false });
    }
  }

  async function postUserData(email, password) {
    try {
      const requestResult = await axios.post('http://localhost:3001/login', {
        email,
        password,
      });
      console.log(requestResult);
    } catch ({ response: { data: { message } } }) {
      setState({ ...state, errorMessage: message });
    }
  }

  return (
    <main className="login-wrapper">
      <Input
        type="text"
        id="common_login__input-email"
        onChange={ validateEmail }
      >
        Login:
      </Input>
      <Input
        type="text"
        id="common_login__input-password"
        onChange={ validatePassword }
      >
        Senha:
      </Input>
      <Button
        id="common_login__button-login"
        disabled={ !(state.isEmailValid && state.isPasswordValid) }
        onClick={ () => postUserData(state.email, state.password) }
      >
        Login
      </Button>
      <Button id="common_login__button-register">Ainda não tenho conta</Button>
      <p data-testid="common_login__element-invalid-email">{ state.errorMessage }</p>
    </main>
  );
}
