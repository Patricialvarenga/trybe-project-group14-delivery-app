import React, { useState, useContext, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import AppContext from '../../context/AppContext';

export default function Login() {
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

  const routes = {
    customer: '/customer/products',
    administrator: '/admin/manage',
    seller: '/seller/orders',
  };

  useEffect(() => {
    if (localStorage.getItem('user')) {
      const { role } = JSON.parse(localStorage.getItem('user'));
      navigate(routes[role]);
    }
  }, [navigate, routes]);

  async function postUserData(email, password) {
    try {
      const { status, data } = await axios.post('http://localhost:3001/login', {
        email,
        password,
      });
      localStorage.setItem('user', JSON.stringify({ ...data }));
      const STATUS_OK = 200;
      if (status === STATUS_OK) {
        setUserData(data);
        setToken(data.token);
        navigate(routes[data.role]);
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
        Ainda n??o tenho conta
      </button>
      <p data-testid="common_login__element-invalid-email">{ state.errorMessage }</p>
    </main>
  );
}
