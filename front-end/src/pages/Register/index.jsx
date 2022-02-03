import { useNavigate } from 'react-router-dom';
import React, { useState } from 'react';

import Joi from 'joi';
import axios from 'axios';

import Button from '../../components/Button';

const nameLimit = 12;
const passwordLimit = 6;

// Remove um erro ao usar o .email() no Joi
const tldsPass = {
  tlds: { allow: false },
};

const schema = Joi.object({
  name: Joi.string().min(nameLimit).required(),
  email: Joi.string().email(tldsPass).required(),
  password: Joi.string().min(passwordLimit).required(),
});

function validate(value) {
  const { error } = schema.validate(value);
  return error !== undefined;
}

export default function Register() {
  const navigate = useNavigate();

  const [invalid, setInvalid] = useState(true);
  const [error, setError] = useState('');

  const [register, setRegister] = useState({
    name: '',
    email: '',
    password: '',
  });

  function handleChange({ target }) {
    const { name, value } = target;

    const newRegister = {
      ...register,
      [name]: value,
    };

    setRegister(newRegister);
    setInvalid(validate(newRegister));
  }

  function showError(message) {
    const fiveSeconds = 5000;

    setError(message);
    setTimeout(() => setError(''), fiveSeconds);
  }

  async function handleSubmit(e) {
    e.preventDefault();

    const host = 'http://localhost:3001';
    const path = 'register';

    const url = `${host}/${path}`;

    try {
      await axios.post(url, register);
      navigate('/customer/products');
    } catch (err) {
      showError(err.message);
    }
  }

  return (
    <div>
      <form onSubmit={ handleSubmit }>
        <input
          data-testid="common_register__input-name"
          name="name"
          type="text"
          onChange={ handleChange }
        />

        <input
          data-testid="common_register__input-email"
          name="email"
          type="email"
          placeholder="seu-email@site.com.br"
          onChange={ handleChange }
        />

        <input
          data-testid="common_register__input-password"
          name="password"
          type="password"
          placeholder="Sua senha"
          onChange={ handleChange }
        />
        <div>
          <Button
            id="common_register__button-register"
            disabled={ invalid }
            type="submit"
          >
            Cadastrar
          </Button>
        </div>
        <div data-testid="common_register__element-invalid_register">
          { error }
        </div>
      </form>
    </div>
  );
}
