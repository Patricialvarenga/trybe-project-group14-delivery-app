import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import React, { useState, useContext } from 'react';

import Joi from 'joi';
import axios from 'axios';

import AppContext from '../../context/AppContext';
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
  const [invalid, setInvalid] = useState(true);
  const { setToken } = useContext(AppContext);
  const navigate = useNavigate();
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

  async function handleSubmit(e) {
    e.preventDefault();
    const OK = 201;
    try {
      const { data, status } = await axios.post('http://localhost:3001/register', { ...register });
      setToken(data.token);
      if (status === OK) return navigate('/customer/products');
    } catch (err) {
      console.log(err);
      Swal.fire({
        title: 'Ops!',
        text: err.message,
        icon: 'error',
        showConfirmButton: false,
        timer: 1500,
      });
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
      </form>
    </div>
  );
}
