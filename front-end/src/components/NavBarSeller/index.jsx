import React, { useContext } from 'react';

import { Link } from 'react-router-dom';
import context from '../../context/AppContext';

export default function NavBarSeller() {
  const { userData: { name } } = useContext(context);

  return (
    <div>
      <Link
        to="/seller/orders"
        data-testid="customer_products__element-navbar-link-orders"
      >
        Pedidos
      </Link>
      <span data-testid="customer_products__element-navbar-user-full-name">
        { name }
      </span>
      <Link
        to="/login"
        data-testid="customer_products__element-navbar-link-logout"
        onClick={ () => localStorage.clear() }
      >
        Sair
      </Link>
    </div>
  );
}
