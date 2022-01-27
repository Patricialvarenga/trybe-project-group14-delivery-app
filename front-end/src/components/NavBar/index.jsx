import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class NavBar extends Component {
  render() {
    const { user } = this.props;
    return (
      <div>
        <div>Produtos</div>
        <div>Meus Pedidos</div>

        <div>{user}</div>
        <div>Sair</div>
      </div>
    );
  }
}

NavBar.propTypes = {
  user: PropTypes.string.isRequired,
};
