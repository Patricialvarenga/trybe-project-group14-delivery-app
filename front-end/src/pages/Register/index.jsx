import React, { useState } from 'react';

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

    // api.post('https://localhost:3000/register', register)
    // .then(console.log)
    // .catch(console.err);
  }

  return (
    <div>
      <form onSubmit={ handleSubmit }>
        <input
          id="common_register__input-name"
          name="name"
          type="text"
          placeholder="Seu nome"
          onChange={ handleChange }
        />

        <input
          id="common_register__input-email"
          name="email"
          type="email"
          placeholder="seu-email@site.com.br"
          onChange={ handleChange }
        />

        <input
          id="common_register__input-password"
          name="password"
          type="password"
          placeholder="Sua senha"
          onChange={ handleChange }
        />
        <div>
          <Button
            id="common_register__button-register"
            type="submit"
          >
            Cadastrar
          </Button>
        </div>
        <div id="common_register__element-invalid_register" />
      </form>
    </div>
  );
}
