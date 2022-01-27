import React from 'react';

export default function NavBar() {
  return (
    <div>
      <div data-testid="customer_products__element-navbar-link-products">
        Produtos
      </div>
      <div data-testid="customer_products__element-navbar-link-orders">
        Meus Pedidos
      </div>

      <div data-testid="customer_products__element-navbar-user-full-name" />
      <div data-testid="customer_products__element-navbar-link-logout">
        Sair
      </div>
    </div>
  );
}
