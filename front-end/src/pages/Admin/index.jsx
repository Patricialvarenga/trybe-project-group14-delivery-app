import axios from 'axios';
import { React, useContext, useState } from 'react';
import AppContext from '../../context/AppContext';

export default function Admin() {
  const [state, setState] = useState({
    username: '',
    isUsernameValid: false,
    email: '',
    isEmailValid: false,
    password: '',
    isPasswordValid: false,
    role: 'customer',
    errorMessage: '',
  });

  const { token, userData: { name } } = useContext(AppContext);

  function validateName({ target: { value } }) {
    const MIN_LENGTH = 12;
    console.log(value.length >= MIN_LENGTH);
    setState({ ...state, username: value, isUsernameValid: value.length >= MIN_LENGTH });
  }

  function validateEmail({ target: { value } }) {
    const regex = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/i;
    const isValid = regex.test(value);
    setState({ ...state, isEmailValid: isValid, email: value });
  }

  function validatePassword({ target: { value } }) {
    const MIN_LENGTH = 6;
    const password = value;
    setState({ ...state, isPasswordValid: password.length >= MIN_LENGTH, password });
  }

  function areFieldsValid() {
    return state.isEmailValid && state.isPasswordValid && state.isUsernameValid;
  }

  async function registerNewUser() {
    const { username, email, password, role } = state;
    try {
      const result = await axios.post('http://localhost:3001/admin', {
        email,
        password,
        name: username,
        role,
      },
      {
        headers: {
          authorization: token,
        },
      });
      console.log(result);
    } catch ({ response }) {
      setState({ ...state, errorMessage: response.data.message });
    }
  }

  return (
    <main>
      <button
        type="button"
        data-testid="customer_products__element-navbar-link-orders"
      >
        Gerenciar Usuários
      </button>
      <p
        data-testid="customer_products__element-navbar-user-full-name"
      >
        { name }
      </p>
      <button
        type="button"
        data-testid="customer_products__element-navbar-link-logout"
      >
        sair
      </button>

      <label htmlFor="admin_manage__input-name">
        Nome
        <input
          data-testid="admin_manage__input-name"
          onChange={ validateName }
        />
      </label>
      <label htmlFor="admin_manage__input-email">
        Email
        <input
          data-testid="admin_manage__input-email"
          onChange={ validateEmail }
        />
      </label>
      <label htmlFor="admin_manage__input-password">
        Senha
        <input
          data-testid="admin_manage__input-password"
          onChange={ validatePassword }
        />
      </label>
      <label htmlFor="admin_manage__select-role">
        <select
          data-testid="admin_manage__select-role"
          value={ state.role }
          onChange={ (evt) => setState({ ...state, role: evt.target.value }) }
        >
          <option value="customer">Cliente</option>
          <option value="seller">Vendedor</option>
        </select>
      </label>
      <button
        type="button"
        data-testid="admin_manage__button-register"
        disabled={ !areFieldsValid() }
        onClick={ registerNewUser }
      >
        Cadastrar
      </button>
      <p data-testid="admin_manage__element-invalid-register">{ state.errorMessage }</p>
    </main>
  );
}
