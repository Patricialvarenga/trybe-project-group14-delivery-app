import React, { useContext } from 'react';

import { Link, useNavigate } from 'react-router-dom';
import context from '../../context/AppContext';

export default function NavBarSeller() {
  const { userData: { name } } = useContext(context);
  const navigate = useNavigate();

  const handleRedirect = () => {
    localStorage.clear();
    navigate('/login');
  };

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
      <button
        type="button"
        data-testid="customer_products__element-navbar-link-logout"
        onClick={ () => handleRedirect() }
      >
        Sair
      </button>
    </div>
  );
}
