import React, { useState, useContext } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import AppContext from '../../context/AppContext';

export default function Login() {
  localStorage.clear();

  const [state, setState] = useState({
    email: '',
    isEmailValid: false,
    password: '',
    isPasswordValid: false,
    errorMessage: '',
  });
  const { setUserData, setToken } = useContext(AppContext);

  const navigate = useNavigate();

  function validateEmail({ target: { value } }) {
    const regex = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/i;
    const isValid = regex.test(value);
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
      const { status, data: { token, ...user } } = await axios.post('http://localhost:3001/login', {
        email,
        password,
      });
      const STATUS_OK = 200;
      if (status === STATUS_OK) {
        const strJSON = JSON.stringify;
        localStorage.setItem('user', strJSON({ token, ...user }));
        setUserData(user);
        setToken(token);
        navigate('/customer/products');
      }
    } catch ({ response: { data: { message } } }) {
      setState({ ...state, errorMessage: message });
    }
  }

  return (
    <main className="login-wrapper">
      <label htmlFor="common_login__input-email">
        Login:
        <input
          type="text"
          data-testid="common_login__input-email"
          onChange={ validateEmail }
        />
      </label>
      <label htmlFor="common_login__input-password">
        Senha:
        <input
          type="text"
          data-testid="common_login__input-password"
          onChange={ validatePassword }
        />
      </label>
      <button
        type="button"
        data-testid="common_login__button-login"
        disabled={ !(state.isEmailValid && state.isPasswordValid) }
        onClick={ () => postUserData(state.email, state.password) }
      >
        Login
      </button>
      <button
        type="button"
        data-testid="common_login__button-register"
        onClick={ () => navigate('/register') }
      >
        Ainda não tenho conta
      </button>
      <p data-testid="common_login__element-invalid-email">{ state.errorMessage }</p>
    </main>
  );
}
