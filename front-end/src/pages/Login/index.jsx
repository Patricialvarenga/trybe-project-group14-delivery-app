import { React } from 'react';
import { Input, Button } from '../../components';

export default function Login() {
  return (
    <main className="login-wrapper">
      <Input type="text" id="common_login__input-email">Login:</Input>
      <Input type="text" id="common_login__input-password">Senha:</Input>
      <Button id=" common_login__button-login">Login</Button>
      <Button id="common_login__button-register">Ainda não tenho conta</Button>
    </main>
  );
}
