import React, { useContext } from 'react';

import { Link } from 'react-router-dom';
import context from '../../context/AppContext';

export default function NavBar() {
  const { userData: { name } } = useContext(context);
  return (
    <div>
      <Link
        to="/customer/products"
        data-testid="customer_products__element-navbar-link-products"
      >
        Produtos
      </Link>
      <Link
        to="/customer/orders"
        data-testid="customer_products__element-navbar-link-orders"
      >
        Meus Pedidos
      </Link>
      <span data-testid="customer_products__element-navbar-user-full-name">
        { name }
      </span>
      <Link
        to="/"
        data-testid="customer_products__element-navbar-link-logout"
        onClick={ () => localStorage.clear() }
      >
        Sair
      </Link>
    </div>
  );
}
