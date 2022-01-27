import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class NavBar extends Component {
  render() {
    const { user } = this.props;
    return (
      <div>
        <div data-testid="customer_products__element-navbar-link-products">
          Produtos
        </div>
        <div data-testid="customer_products__element-navbar-link-orders">
          Meus Pedidos
        </div>

        <div data-testid="customer_products__element-navbar-user-full-name">
          {user}
        </div>
        <div data-testid="customer_products__element-navbar-link-logout">
          Sair
        </div>
      </div>
    );
  }
}

NavBar.propTypes = {
  user: PropTypes.string.isRequired,
};
