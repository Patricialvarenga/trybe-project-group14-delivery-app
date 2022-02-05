import React from 'react';

export default function Admin() {
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
        Trybeer Admin
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
        />
      </label>
      <label htmlFor="admin_manage__input-email">
        Email
        <input
          data-testid="admin_manage__input-email"
        />
      </label>
      <label htmlFor="admin_manage__input-password">
        Senha
        <input
          data-testid="admin_manage__input-password"
        />
      </label>
      <label htmlFor="admin_manage__select-role">
        <select data-testid="admin_manage__select-role">
          <option value="customer">Cliente</option>
          <option value="seller">Vendedor</option>
        </select>
      </label>
      <button
        type="button"
        data-testid="admin_manage__button-register"
      >
        Cadastrar
      </button>
    </main>
  );
}
