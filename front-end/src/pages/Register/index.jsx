import React, { useState } from 'react';
import axios from 'axios';

import Button from '../../components/Button';

export default function Register() {
  const [register, setRegister] = useState({
    name: '',
    email: '',
    password: '',
  });

  function handleChange({ target }) {
    const { name, value } = target;

    setRegister({
      ...register,
      [name]: value,
    });
  }

  function handleSubmit(e) {
    e.preventDefault();

    axios.post('http://localhost:3001/register', register)
      .then(({ token }) => localStorage.setItem(token, token))
      .catch(console.err);
  }

  return (
    <div>
      <form onSubmit={ handleSubmit }>
        <input
          data-testid="common_register__input-name"
          name="name"
          type="text"
          required
          placeholder="Seu nome"
          onChange={ handleChange }
        />

        <input
          data-testid="common_register__input-email"
          name="email"
          type="email"
          required
          placeholder="seu-email@site.com.br"
          onChange={ handleChange }
        />

        <input
          data-testid="common_register__input-password"
          name="password"
          type="password"
          required
          placeholder="Sua senha"
          onChange={ handleChange }
        />
        <div>
          <Button
            id="common_register__button-register"
          >
            Cadastrar
          </Button>
        </div>
        <div data-testid="common_register__element-invalid_register" />
      </form>
    </div>
  );
}
