import { React } from 'react';

import Input from '../../components/Input';
import Button from '../../components/Button';

export default function Register() {
  return (
    <div>
      <Input
        data-testid="common_register__input-name"
        type="name"
        placeholder="Seu nome"
      />

      <Input
        data-testid="common_register__input-email"
        type="email"
        placeholder="seu-email@site.com.br"
      />

      <Input
        data-testid="common_register__input-password"
        type="password"
        placeholder="Sua senha"
      />
      <div>
        <Button
          data-testid="common_register__button-register"
          type="button"
        >
          Cadastrar
        </Button>
      </div>
      <div data-testid="common_register__element-invalid_register" />
    </div>
  );
}
